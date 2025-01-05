# Guide d'installation de Rust

Pas envie d'installer Rust pour le moment ? [Utiliser l'IDE Rust Online](https://play.rust-lang.org/)

## **1. Installer Rust**

Pour installer Rust, utilisez `rustup`, l'outil officiel d'installation et de gestion des versions :

- [Télécharger rustup](https://www.rust-lang.org/fr/tools/install)
- Assurez-vous que les versions suivantes sont installées :
  - **Rust** : 1.78.0
  - **Cargo** : 1.78.0

---

## **2. Vérifier l'installation**

Ouvrez un terminal et tapez :

```sh
rustc --version
cargo --version
```

Si les versions s'affichent, Rust est bien installé.

---

## **3. Créer un Nouveau Projet**

Pour créer un projet Rust avec Cargo :

```sh
cargo new mon_projet
cd mon_projet
```

Cela génère la structure de base d'un projet Rust.

---

## **4. Compiler et Exécuter un Projet**

### Compiler le projet
```sh
cargo build
```

### Exécuter le projet
```sh
cargo run
```

---

## **5. Compiler un Fichier Unique sans Cargo**

Si vous souhaitez simplement compiler un fichier `main.rs` sans créer de projet :

```sh
rustc main.rs
```

Puis lancer l'éxécutable 

```sh
./main
```