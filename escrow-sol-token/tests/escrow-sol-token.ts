import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { EscrowSolToken } from "../target/types/escrow_sol_token";
import { Keypair, SystemProgram } from "@solana/web3.js";
import {
  createMint,
  createAccount,
  mintTo,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

describe("escrow-sol", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.EscrowSolToken as Program<EscrowSolToken>;

  const maker = Keypair.generate();
  const taker = Keypair.generate();

  let escrowPda: anchor.web3.PublicKey;
  let escrowBump: number;

  let makerTokenAta: anchor.web3.PublicKey;
  let takerTokenAta: anchor.web3.PublicKey;
  let takerTokenMint: anchor.web3.PublicKey;

  const escrowAmount = 0.5 * anchor.web3.LAMPORTS_PER_SOL; // 0.5 SOL
  const takerTokenAmount = 100; // 100 tokens

  before(async () => {
    // Airdrop 1 SOL to maker
    const makerAirdrop = await provider.connection.requestAirdrop(
      maker.publicKey,
      anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(makerAirdrop, 'confirmed');

    // Airdrop 1 SOL to taker
    const takerAirdrop = await provider.connection.requestAirdrop(
      taker.publicKey,
      anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(takerAirdrop, 'confirmed');

    console.log("Airdrop completed for maker and taker");

    // Create a token mint and token accounts
    takerTokenMint = await createMint(
      provider.connection,
      taker,
      taker.publicKey,
      null,
      0 // 0 decimals
    );

    const makerTokenAccount = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      maker,
      takerTokenMint,
      maker.publicKey
    );
    makerTokenAta = makerTokenAccount.address;
    console.log("makerTokenAta", makerTokenAta.toString())

    const takerTokenAccount = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      taker,
      takerTokenMint,
      taker.publicKey
    );
    takerTokenAta = takerTokenAccount.address;
    console.log("takerTokenAta", takerTokenAta.toString())

    // Mint tokens to the taker
    await mintTo(
      provider.connection,
      taker,
      takerTokenMint,
      takerTokenAta,
      taker.publicKey,
      takerTokenAmount
    );

    console.log("Token mint and accounts created");
  });

  it("Initializes the escrow", async () => {
    // Derive the PDA for the escrow account
    [escrowPda, escrowBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("escrow"), maker.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .initializeEscrow(new anchor.BN(escrowAmount), new anchor.BN(takerTokenAmount), takerTokenMint)
      .accounts({
        escrowAccount: escrowPda,
        maker: maker.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([maker]) // Maker must sign this transaction
      .rpc();

    const escrowAccount = await program.account.escrowAccount.fetch(escrowPda);
    console.log("Escrow initialized with SOL amount: ", Number(escrowAccount.makerAmount));
    console.log("Escrow initialized with token mint: ", escrowAccount.takerTokenMint.toString());
    console.log("Escrow initialized with token amount: ", Number(escrowAccount.takerAmount));

    const escrowBalance = await provider.connection.getBalance(escrowPda);

    console.log("Escrow balance: ", escrowBalance);
  });

  it("Accepts the escrow", async () => {
    await program.methods
      .acceptEscrow()
      .accounts({
        escrowAccount: escrowPda,
        taker: taker.publicKey,
        maker: maker.publicKey,
        takerTokenAccount: takerTokenAta,
        makerTokenAccount: makerTokenAta,
        takerTokenMint: takerTokenMint,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([taker])
      .rpc();

    // Validate that the SOL transfer occurred
    const makerBalance = await provider.connection.getBalance(maker.publicKey);
    const takerBalance = await provider.connection.getBalance(taker.publicKey);

    console.log("Maker balance after escrow acceptance: ", makerBalance);
    console.log("Taker balance after escrow acceptance: ", takerBalance);

    // Validate that the token transfer occurred
    const makerTokenAccountInfo = await provider.connection.getTokenAccountBalance(
      makerTokenAta
    );
    const takerTokenAccountInfo = await provider.connection.getTokenAccountBalance(
      takerTokenAta
    );

    console.log("Maker token balance: ", makerTokenAccountInfo.value.uiAmount);
    console.log("Taker token balance: ", takerTokenAccountInfo.value.uiAmount);
  });
});
