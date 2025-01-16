
# Exercice 11 : Enums (Transport)

## **1. Définition et Utilisation des Enums**

Les **enums** permettent de définir un type pouvant contenir plusieurs variantes. Voici un exemple classique avec un `enum` représentant le statut d'une tâche :

### **Déclaration et Utilisation :**
```rust
#[derive(Debug)]
enum Status {
    ToDo,
    InProgress,
    Done,
}

struct Todo {
    title: String,
    status: Status,
}

impl Todo {
    fn change_status(&mut self, new_status: Status) {
        self.status = new_status;
    }
}

fn main() {
    let mut task = Todo {
        title: String::from("Do my homework"),
        status: Status::ToDo,
    };

    println!("Initial status: {:?}", task.status);
    task.change_status(Status::InProgress);
    println!("Updated status: {:?}", task.status);
}
```

### **Caractéristiques :**
- `#[derive(Debug)]` permet d'afficher facilement un `enum` avec `println!`.
- Un `enum` peut contenir des variantes simples ou avec des données associées.

---

## **2. Exercice : Créer et Utiliser un Enum (Transport)**

### Instructions
1. Déclarez un `enum` `Transport` avec trois variantes : `Car`, `Bike`, et `Train`.
2. Créez une struct `Trip` contenant un `destination` et un champ `mode` utilisant l'enum `Transport`.

**Bonus :** Ajoutez des données associées à `Car` (un `String` pour le modèle) et à `Train` (un `u32` pour le numéro).

```rust
#[derive(Debug)]
// TODO: Déclarer ici l'enum Transport

struct Trip {
    destination: String,
    // TODO: Ajouter le champ mode
}

fn main() {
    let trip = Trip {
        destination: String::from("Paris"),
        // TODO: Ajouter le champ mode
    };

    println!("Trip to {} using {:?}", trip.destination, trip.mode);
}
```

### Exemple attendu :
```plaintext
Trip to Paris using Train
```
