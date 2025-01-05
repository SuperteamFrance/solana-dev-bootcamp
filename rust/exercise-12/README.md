
# Exercice 12 : Modules et Crates


## **1. Modules en Rust**

Les **modules** permettent d'organiser le code Rust en plusieurs fichiers ou sections logiques. Ils sont utiles pour séparer les responsabilités dans un projet.

### **Déclaration et Utilisation :**
```rust
// fichier main.rs
mod utils;

fn main() {
    utils::saluer();
}

// fichier utils.rs
pub fn saluer() {
    println!("Bonjour depuis le module utils!");
}
```
- `mod utils;` importe le fichier `utils.rs`.
- Le mot-clé `pub` rend la fonction accessible depuis l'extérieur du module.

---

## **2. Crates (Librairies)**

Une **crate** est un package Rust contenant un projet complet ou une bibliothèque réutilisable. 

### **Ajouter une Crate depuis Crates.io :**
1. Ajoutez une crate dans le fichier `Cargo.toml` :
```toml
tokio = { version = "1", features = ["full"] }
rand = "0.8"
serde = { version = "1.0", features = ["derive"] }
```
2. Utilisez la crate dans le code :
```rust
use rand::Rng;

fn main() {
    let nombre_aleatoire = rand::thread_rng().gen_range(1..=100);
    println!("Nombre aléatoire: {}", nombre_aleatoire);
}
```
---

## **3. Exercice : Créer un Module et Utiliser une Crate**

### Instructions
1. Créez un fichier `utils.rs` avec une fonction `generate_number` qui retourne un nombre aléatoire.
2. Importez le module dans `main.rs` et affichez le résultat.
3. Utilisez la crate `rand` pour la génération aléatoire (à ajouter dans `Cargo.toml`).

### **main.rs (à compléter)**
```rust
mod utils;

fn main() {
    let nombre = utils::generate_number();
    println!("Nombre aléatoire: {}", nombre);
}
```

### **utils.rs (à compléter)**
```rust
use rand::Rng;

pub fn generate_number() -> u32 {
    // TODO: Retourner un nombre aléatoire
}
```

### Exemple attendu :
```plaintext
Nombre aléatoire: 42
```
