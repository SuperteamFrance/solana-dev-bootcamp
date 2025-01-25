# Create Token Program

Ce programme Solana permet de créer et de gérer des tokens personnalisés sur la blockchain Solana.

## Fonctionnalités

- Création d'un nouveau token (mint)
- Configuration personnalisable du nombre de décimales (par défaut: 6)
- Mint de nouveaux tokens
- Gestion des comptes de tokens associés

## Prérequis

- [Rust](https://rustup.rs/)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor](https://www.anchor-lang.com/)
- [Node.js](https://nodejs.org/)

## Installation

1. Clonez le dépôt :
```bash
git clone <votre-repo>
cd create-token
```

2. Installez les dépendances :
```bash
yarn install
```

3. Construisez le programme :
```bash
anchor build
```

## Structure du Programme

Le programme contient deux instructions principales :

1. `initialize_mint` : Crée un nouveau token avec un nombre de décimales configurable
2. `mint_token` : Frappe de nouveaux tokens et les envoie à un compte spécifié

## Utilisation

### Déploiement

1. Démarrez un nœud local Solana :
```bash
solana-test-validator
```

2. Déployez le programme :
```bash
anchor deploy
```

### Exemple d'Utilisation

```typescript
// Création d'un nouveau token
const mintKeypair = Keypair.generate();
const mintAuthority = Keypair.generate();

// Initialisation du mint
await program.methods
  .initializeMint(null) // null pour utiliser 6 décimales par défaut
  .accounts({
    mint: mintKeypair.publicKey,
    mintAuthority: mintAuthority.publicKey,
    payer: yourWallet.publicKey,
  })
  .signers([mintKeypair, mintAuthority])
  .rpc();

// Création du compte de tokens associé
const tokenAccount = await getAssociatedTokenAddress(
  mintKeypair.publicKey,
  recipientWallet.publicKey
);

// Frappe de tokens
await program.methods
  .mintToken(new anchor.BN(100 * LAMPORTS_PER_SOL))
  .accountsPartial({
    mint: mintKeypair.publicKey,
    tokenAccount: tokenAccount,
    tokenOwner: recipientWallet.publicKey,
    mintAuthority: mintAuthority.publicKey,
  });
```

## Tests

Pour exécuter les tests :
```bash
anchor test
```

## Sécurité

- Assurez-vous de bien gérer les clés d'autorité du mint
- Vérifiez toujours les permissions avant d'effectuer des opérations de frappe
- Utilisez des comptes de tokens associés pour la sécurité des utilisateurs

## Licence

Ce projet est sous licence [MIT](LICENSE).
