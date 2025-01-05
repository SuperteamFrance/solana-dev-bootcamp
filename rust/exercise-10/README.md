# Exercice 10 : Pattern Matching


## **1. Définition et Utilisation de `match`**

Le mot-clé `match` permet de comparer une valeur à une série de motifs. Il sélectionne le premier motif correspondant, un peu comme un `switch` dans d'autres langages.

### **Exemple de Base :**
```rust
fn main() {
    let number = 3;

    match number {
        1 => println!("Un"),
        2 => println!("Deux"),
        3 => println!("Trois"),
        _ => println!("Autre"), // Motif générique
    }
}
```

### **Exemple avec des chaînes et l'opérateur `|` :**
```rust
fn main() {
    let jour = "Mardi";

    let is_weekend = match jour {
        "Samedi" | "Dimanche" => true,
        "Lundi" | "Mardi" | "Mercredi" | "Jeudi" | "Vendredi" => false,
        _ => false,
    };

    println!("C'est le weekend ? {}", is_weekend);
}
```

### **Caractéristiques :**
- Toutes les branches doivent retourner le même type.
- Le motif `_` est utilisé comme cas générique (par défaut).
- L'opérateur `|` permet de combiner plusieurs motifs dans une seule branche.

---

## **2. Exercice : Utiliser `match`**

### Instructions
1. Créez une variable `score` avec une valeur entière.
2. Utilisez `match` pour afficher :
   - "Excellent!" si le score est 10.
   - "Bien joué!" si le score est entre 7 et 9 inclus.
   - "Peut mieux faire" si le score est entre 4 et 6 inclus.
   - "Échec..." pour toute autre valeur.

### **main.rs (à compléter)**
```rust
fn main() {
    let score = 8; // À modifier pour tester

    // Utilisez match ici pour évaluer le score
}
```

#### Exemple attendu :
```plaintext
Bien joué!
```
