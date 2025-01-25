// Importer les dépendances nécessaires
import * as anchor from "@coral-xyz/anchor";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";

// Importer le type du programme
import { CreateToken } from "../target/types/create_token";

describe("create-token", () => {
  // Configurer le provider Anchor depuis l'environnement
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Initialiser le programme et générer les paires de clés nécessaires
  const program = anchor.workspace.CreateToken as anchor.Program<CreateToken>;
  const mintKeypair = Keypair.generate();
  const mintAuthority = Keypair.generate();

  it("Creates a token mint and mints tokens", async () => {
    // Créer une nouvelle monnaie avec 6 décimales par défaut
    await program.methods
      .initializeMint(null)
      .accounts({
        mint: mintKeypair.publicKey,
        mintAuthority: mintAuthority.publicKey,
        payer: provider.wallet.publicKey,
      })
      .signers([mintKeypair, mintAuthority])
      .rpc();

    // Obtenir l'adresse du compte de jetons associé
    const tokenAccount = await getAssociatedTokenAddress(
      mintKeypair.publicKey,
      provider.wallet.publicKey
    );

    // Frapper 100 jetons et les envoyer au compte
    await program.methods
      .mintToken(new anchor.BN(100 * LAMPORTS_PER_SOL))
      .accountsPartial({
        mint: mintKeypair.publicKey,
        tokenAccount: tokenAccount,
        tokenOwner: provider.wallet.publicKey,
        mintAuthority: mintAuthority.publicKey,
        payer: provider.wallet.publicKey,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([mintAuthority])
      .rpc();

    // Afficher les informations sur la création et le minting
    console.log("Monnaie créée:", mintKeypair.publicKey.toString());
    console.log("Jetons envoyés à:", tokenAccount.toString());
  });
});
