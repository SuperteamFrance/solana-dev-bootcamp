# Exercice Final : Gestion d'un Parc Automobile

## **Instructions :**

1. Créez un `enum` `Status` avec deux variantes : `Available` et `InRepair`.
2. Créez une struct `Car` avec `model`, `year` et `status`.
3. Implémentez les méthodes :
   - `new` : Créer une nouvelle voiture.
   - `send_to_repair` : Changer le statut en `InRepair`.
   - `mark_available` : Changer le statut en `Available`.
   - `display` : Afficher les informations d'une voiture.
4. Créez une fonction `search_car` qui prend un modèle en paramètre et retourne la voiture correspondante si elle est trouvée.
5. **Ajoutez une méthode `is_vintage`** : retourne `true` si la voiture a plus de 30 ans, sinon `false`.

---

## **main.rs (fourni)**
```rust
fn main() {
    // Créez un garage contenant plusieurs voitures
    let mut garage = vec![
        // TODO : Ajouter des voitures avec la méthode new
    ];

    // Envoyer une voiture en réparation
    // TODO : Modifier le statut d'une voiture avec send_to_repair

    // Afficher toutes les voitures
    for car in &garage {
        // TODO : Afficher chaque voiture
    }

    // Rechercher une voiture et afficher le résultat
    match search_car("Renault Clio", &garage) {
        Some(car) => println!("La voiture '{}' a été trouvée.", car.model),
        None => println!("Voiture non trouvée."),
    }

    // Vérifier si une voiture est vintage
    if garage[0].is_vintage() {
        println!("{} est une voiture vintage!", garage[0].model);
    }
}
```

---

## **Exemple attendu :**
```plaintext
Voiture : Tesla Model 3, Année : 2020, Statut : Available
Voiture : Renault Clio, Année : 2015, Statut : InRepair
Voiture : Ford Focus, Année : 1980, Statut : Available
La voiture 'Renault Clio' a été trouvée.
Ford Focus est une voiture vintage!
```