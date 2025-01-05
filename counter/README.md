# Programme de Compteur Solana

Un programme Solana simple qui implémente un compteur avec des fonctions d'incrémentation et de décrémentation.

## Fonctionnalités

Le programme permet de :
- Initialiser un nouveau compteur à 0
- Incrémenter le compteur (+1)
- Décrémenter le compteur (-1)

## Structure du Programme

### Instructions

```rust
// Initialise un nouveau compteur
initialize(ctx: Context<Initialize>) -> Result<()>

// Incrémente le compteur de 1
increment(ctx: Context<Update>) -> Result<()>

// Décrémente le compteur de 1
decrement(ctx: Context<Update>) -> Result<()>
```

### Comptes

```rust
// Structure du compte Counter
pub struct Counter {
    pub count: i64,
}
```

## Tests

Le programme inclut des tests qui vérifient :
- L'initialisation d'un nouveau compteur
- L'incrémentation du compteur
- La décrémentation du compteur

Pour exécuter les tests :

```bash
anchor test
```

## Utilisation

1. Construire le programme :
```bash
anchor build
```

2. Déployer le programme :
```bash
anchor deploy
```

3. Interagir avec le programme via les instructions disponibles :
```typescript
// Exemple d'initialisation
await program.methods
  .initialize()
  .accountsPartial({
    counter: counterKeypair.publicKey,
    user: provider.wallet.publicKey,
  })
  .signers([counterKeypair])
  .rpc();

// Exemple d'incrémentation
await program.methods
  .increment()
  .accounts({
    counter: counterKeypair.publicKey,
  })
  .rpc();
```

## Prérequis

- Solana Tool Suite
- Anchor Framework
- Node.js et Yarn
- Rust

## Licence

Ce projet est sous licence MIT. 