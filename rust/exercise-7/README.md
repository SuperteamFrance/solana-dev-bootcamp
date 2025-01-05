
# Exercice 7 : String et &str


## **1. Différence entre `String` et `&str`**


En Rust, il existe deux types principaux de chaînes de caractères :

Utilisez `&str` lorsque vous travaillez avec des chaînes statiques et immuables. Utilisez `String` lorsque vous avez besoin d'une chaîne modifiable.

### **`String`** (chaîne dynamique)
- Allouée dynamiquement sur le tas.
- Peut être modifiée.

```rust
let mut s = String::from("Hello");
s.push_str(" World!");
println!("{}", s);
```

### **`&str`** (chaîne littérale)
- Alloué sur la pile (stack).
- Référence à une chaîne de caractères.
- Immuable.

```rust
let s: &str = "Hello";
println!("{}", s);
```



## **2. Conversion entre `&str` et `String`**

### Convertir une `&str` en `String`
```rust
let s = "Hello".to_string();
let s = String::from("Hello");
```

### Convertir une `String` en `&str`
```rust
let s = String::from("Hello");
let slice = s.as_str();
```

---

## **3. Exercice : Corriger les erreurs de type String et &str**

### Instructions
Corrigez le code ci-dessous pour afficher correctement **prénom** + "est présent". Le prénom doit être déclaré sous forme de `&str`, converti en `String` pour pouvoir y ajouter du texte, puis affiché en `String` et en `&str`.

```rust
fn afficher_message(message: &str) {
    println!("Message : {}", message);
}

fn main() {
    let prenom = "Julien";
    
    let mut prenom_modifiable = prenom;
    prenom_modifiable.push_str(" est présent!");

    // Afficher en String
    println!("{}", prenom_modifiable);

    // Afficher en &str
    afficher_message(prenom_modifiable);
}
```

**Attendu :**
```plaintext
Julien est présent!
Message : Julien est présent!!
```