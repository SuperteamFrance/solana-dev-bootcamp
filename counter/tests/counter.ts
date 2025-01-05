import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { expect } from "chai";

describe("counter", () => {
  // Configure le client pour utiliser le cluster local
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;
  const provider = anchor.AnchorProvider.env();

  it("Crée et initialise un compteur", async () => {
    // Génère une nouvelle paire de clés pour le compte du compteur
    const counterKeypair = anchor.web3.Keypair.generate();

    // Initialise le compteur
    const tx = await program.methods
      .initialize()
      .accountsPartial({
        counter: counterKeypair.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([counterKeypair])
      .rpc();

    // Récupère les détails du compte
    const account = await program.account.counter.fetch(
      counterKeypair.publicKey
    );

    // Vérifie que le compteur est initialisé à 0
    expect(account.count.toString()).to.equal("0");
  });

  it("Incrémente le compteur", async () => {
    // Génère une nouvelle paire de clés pour le compte du compteur
    const counterKeypair = anchor.web3.Keypair.generate();

    // Initialise le compteur
    await program.methods
      .initialize()
      .accountsPartial({
        counter: counterKeypair.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([counterKeypair])
      .rpc();

    // Incrémente le compteur
    await program.methods
      .increment()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc();

    // Récupère les détails du compte
    const account = await program.account.counter.fetch(
      counterKeypair.publicKey
    );

    // Vérifie que le compteur est à 1
    expect(account.count.toString()).to.equal("1");
  });

  it("Décrémente le compteur", async () => {
    // Génère une nouvelle paire de clés pour le compte du compteur
    const counterKeypair = anchor.web3.Keypair.generate();

    // Initialise le compteur
    await program.methods
      .initialize()
      .accountsPartial({
        counter: counterKeypair.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([counterKeypair])
      .rpc();

    // Décrémente le compteur
    await program.methods
      .decrement()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc();

    // Récupère les détails du compte
    const account = await program.account.counter.fetch(
      counterKeypair.publicKey
    );

    // Vérifie que le compteur est à -1
    expect(account.count.toString()).to.equal("-1");
  });
});
