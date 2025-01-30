# Escrow-SOL

## 📌 Introduction

Escrow-SOL est un smart contract Solana permettant de sécuriser une transaction entre deux utilisateurs.  
L'utilisateur **A** dépose des SOL dans l'escrow, et l'utilisateur **B** peut ensuite retirer ces SOL sous certaines conditions prédéfinies.

## 📜 Conception

![Diagramme de fonctionnement](conception.png)  

## 🛠 Installation et Configuration

```sh
anchor init escrow-sol
```
```sh
anchor build
```
```sh
anchor deploy
```

### 4️⃣ Lancement des tests
```sh
anchor test --skip-deploy --skip-local-validator
```

## 🚀 Exécution locale

### Démarrer un validateur local Solana
```sh
solana-test-validator
```

### Configuration de Solana en local
Afficher la configuration actuelle :
```sh
solana config get
```
Définir l'URL locale :
```sh
solana config set --url localhost
```


## 📜 Théorie Accounts & PDA

![Slide1](slide1.PNG)
![Slide2](slide2.PNG)
![Slide3](slide3.PNG)