import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { EscrowSol } from "../target/types/escrow_sol";
import { Keypair, SystemProgram } from "@solana/web3.js";

describe("escrow-sol", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.EscrowSol as Program<EscrowSol>;

  const maker = Keypair.generate();
  const taker = Keypair.generate();

  let escrowPda: anchor.web3.PublicKey;
  let escrowBump: number;

  const escrowAmount = 0.5 * anchor.web3.LAMPORTS_PER_SOL; // 0.5 SOL

  before(async () => {
    // Airdrop 1 SOL to maker
    const makerAirdrop = await provider.connection.requestAirdrop(
      maker.publicKey,
      anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(makerAirdrop);

    // Airdrop 1 SOL to taker
    const takerAirdrop = await provider.connection.requestAirdrop(
      taker.publicKey,
      anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(takerAirdrop);

    console.log("Airdrop completed for maker and taker");
  });

  it("Initializes the escrow", async () => {
    
  });

  it("Accepts the escrow", async () => {

  });
});
