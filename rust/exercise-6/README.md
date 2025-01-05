# Exercice 6 : Ownership et Références

## **1. Principe de l'Ownership**

Rust garantit la sécurité mémoire avec le système d'ownership. Chaque valeur a :

- **Un propriétaire unique** : Une variable qui détient la valeur.
- **Une seule variable peut posséder une valeur à un instant donné.**

Exemple :

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 n'est plus valide ici (mouvement)
    println!("{}", s2);
}
```

<img src="https://preview.redd.it/j64kjkjuymf91.png?auto=webp&s=45c61d72f13a2d38326852c90aa8b3b32627e119" alt="Ownership Diagram" width="650px" height="450px">

---

## **2. Références et Emprunts**

Pour prêter l'accès à une valeur sans transférer l'ownership, on utilise les références :

```rust
fn afficher(message: &String) {
    println!("{}", message);
}

fn main() {
    let s = String::from("hello");
    afficher(&s); // s reste valide
    println!("Toujours valide : {}", s);
}
```

- `&s` : référence empruntée.
- **Immuable** : Par défaut, une référence est immuable.

---

## **3. Emprunts Mutables**

Les références peuvent être mutables, mais avec des règles strictes :

```rust
fn changer(s: &mut String) {
    s.push_str(" world!");
}

fn main() {
    let mut s = String::from("hello");
    changer(&mut s);
    println!("{}", s);
}
```

- **Une seule référence mutable** autorisée par scope.
- **Pas de mélange** : une référence mutable exclut les références immuables simultanément.

---

## **Exercice : Corriger les erreurs d'ownership**

### Instructions
Voici trois scénarios de code incorrects : corrigez-les en ajoutant des références ou en modifiant le code de manière appropriée.

### Code 1 : Problème de mouvement
```rust
fn afficher_longueur(s: String) {
    println!("Longueur: {}", s.len());
}

fn main() {
    let s1 = String::from("Hello");
    afficher_longueur(s1);
    println!("{}", s1); // Erreur ici
}
```

### Code 2 : Conflit entre immuable et mutable
```rust
fn doubler(s: &mut String) {
    s.push_str(s);
}

fn main() {
    let mut s = String::from("Hello");
    let r1 = &s;
    doubler(&mut s); // Erreur ici
    println!("{}", r1);
}
```

### Code 3 : Emprunt après libération
```rust
fn obtenir_longueur(s: &String) -> usize {
    s.len()
}

fn main() {
    let mut s = String::from("Hello");
    let r1 = &mut s;
    println!("Longueur: {}", obtenir_longueur(&s)); // Erreur ici
}
```