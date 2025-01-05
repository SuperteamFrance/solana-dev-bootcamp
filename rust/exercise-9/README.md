
# Exercice 9 : Structs et Impl

---

## **1. Définition et Utilisation des Structs**

Les **structs** (structures) permettent de regrouper plusieurs valeurs sous un même nom. Elles sont utiles pour représenter des entités plus complexes.

### **Déclaration et Utilisation :**
```rust
struct Person {
    name: String,
    age: u8,
    hobby: String,
}

fn main() {
    let age = 30;
    let p = Person {
        name: String::from("Max"),
        age,
        hobby: String::from("Tennis")
    };

    println!("{} is {} years old and his hobby is {}", p.name, p.age, p.hobby);
}
```

---

## **2. Utilisation de `impl`**

Le mot-clé `impl` (implementation) permet d'ajouter des méthodes associées à une struct. Il améliore la lisibilité et l'organisation du code.

### **Exemple :**
```rust
struct Compteur {
    valeur: u32,
}

impl Compteur {
    fn incrementer(&mut self) {
        self.valeur += 1;
    }

    fn nouveau(valeur_initiale: u32) -> Compteur {
        Compteur { valeur: valeur_initiale }
    }
}

fn main() {
    let mut compteur = Compteur::nouveau(0);
    compteur.incrementer();
    println!("Valeur actuelle du compteur : {}", compteur.valeur);
}
```

### **Deux types de méthodes :**
- **Méthodes de type** : Appelées directement sur le type (`Compteur::nouveau()`)
- **Méthodes d'instance** : Utilisent `self` et sont appelées sur une instance (`compteur.incrementer()`)

---

## **3. Exercice : Struct et Impl**

### Instructions
1. Créez une struct `Book` avec les champs `title`, `author` et `year`.
2. Implémentez une méthode `create` qui crée un livre à partir de valeurs passées en argument.
3. Implémentez une méthode `summary` qui affiche un résumé du livre (titre et auteur).

### **main.rs (à compléter)**
```rust
fn main() {
    // Créez un livre en utilisant la méthode new
    let book = Book::create("Les Misérables", "Victor Hugo", 1862);

    // Affichez le résumé avec la méthode summary
    book.summary();
}

struct Book {
    // À compléter : Définir les champs ici
}
```

#### Exemple attendu :
```rust
Le livre "Les Misérables" de Victor Hugo, publié en 1862.
```
