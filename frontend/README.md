# Frontend app

### Générer son repertoire avec la commande ci-dessous
```rust
npx create-solana-dapp@latest
```
- Choix du template
- Choix du langage entre Next et React 


## Les librairies importantes 
Interaction avec le Smart Contract
- @coral-xyz/anchor → Le framework Anchor pour créer et interagir avec les programmes Solana
- @solana/web3.js → SDK principal de Solana pour envoyer des transactions, gérer les comptes et interagir avec la blockchain
- @solana/spl-token → Bibliothèque SPL de Solana pour gérer les tokens (ex. : mint, transfert et gestion des tokens SPL)

Intégration du wallet
- @solana/wallet-adapter-base → Utilitaires de base pour construire des adaptateurs de portefeuille
- @solana/wallet-adapter-react → Hooks React pour intégrer les portefeuilles Solana
- @solana/wallet-adapter-react-ui → Composants UI préconstruits pour connecter et gérer les portefeuilles

## Code Intégration du wallet
*solana-provider.tsx*
```tsx
<ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
</ConnectionProvider>
```

*layout.tsx*
```tsx
<ReactQueryProvider>
    <ClusterProvider>
        <SolanaProvider>
            <UiLayout links={links}>{children}</UiLayout>
        </SolanaProvider>
    </ClusterProvider>
</ReactQueryProvider>
```

## Interagir avec la blockchain Solana via RPC
Un RPC permet d'interagir avec la blockchain Solana en envoyant des requêtes à un nœud distant. Il existe des services gratuits et payants comme Helius, Quicknode et Triton.

📌 Liste complète des méthodes RPC Solana : [Consulter la documentation officielle](https://solana.com/fr/docs/rpc/http)

💡 Exemples d'utilisation : Toutes les implémentations de ces méthodes sont disponibles dans le fichier account-data-access.tsx du projet counter-dapp.

#### Récupérer le nombre de SOL de l'utilisateur (getBalance)
```tsx
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const connection = new Connection("https://api.mainnet-beta.solana.com");
const publicKey = new PublicKey("oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd7");

async function getBalance() {
  const balance = await connection.getBalance(publicKey);
  console.log(`Solde: ${balance / LAMPORTS_PER_SOL} SOL`);
}
```

#### Voir l’historique des transactions d’un utilisateur (getSignaturesForAddress)
```tsx
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection("https://api.mainnet-beta.solana.com");
const publicKey = new PublicKey("oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd7");

async function getTransactionHistory() {
  const transactions = await connection.getSignaturesForAddress(publicKey);
  console.log("Historique des transactions:", transactions);
}
```

#### Voir tous les tokens SPL détenus par un utilisateur (getParsedTokenAccountsByOwner)
```tsx
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const connection = new Connection("https://api.mainnet-beta.solana.com");
const publicKey = new PublicKey("oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd7");

async function getTokenAccounts() {
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  });

  tokenAccounts.value.forEach((account) => {
    console.log("Token:", account.account.data.parsed.info.mint);
    console.log("Solde:", account.account.data.parsed.info.tokenAmount.uiAmount);
  });
}
```

## IDL
Anchor génère un fichier IDL dans /target/idl/nom_du_programme.json  
Ce fichier décrit les instructions, arguments et comptes du programme, facilitant ainsi l'intégration au frontend via Anchor  

## Interagir avec un programme

### 1️⃣ Initialiser le programme avec l'IDL
```tsx
import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "../target/idl/nom_du_programme.json";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const wallet = useWallet();

const provider = new AnchorProvider(connection, wallet, {});
const program = new Program(idl as Idl, new PublicKey(idl.metadata.address), provider);
```

### 2️⃣ Appeler une instruction du programme (Initialiser un counter)
```tsx
await program.methods
  .initialize()
  .accounts({
    counter: counterPubkey
  })
  .rpc();
```

### 3️⃣ Récupérer les données d'un account counter 
```tsx
await program.account.counter.fetch(counterPubkey)
```

### 4️⃣ Récupérer tous les accounts du type counter
```tsx
await program.account.counter.all()
```
