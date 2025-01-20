struct Car {
    model: String,
    year: u16,
    is_repaired: bool,
}

impl Car {
    // Crée une nouvelle voiture
    fn new(model: String, year: u16) -> Self {
        Self {
            model,
            year,
            is_repaired: true,
        }
    }

    // Envoie la voiture en réparation
    fn send_to_repair(&mut self) {
        self.is_repaired = false;
    }

    // Vérifie si la voiture est vintage (âge > 25 ans)
    fn is_vintage(&self) -> bool {
        let current_year = 2025;
        current_year - self.year > 25
    }
}

// Recherche une voiture dans le garage par son modèle
fn search_car(model: String, garage: &[Car]) -> Option<&Car> {
    garage.iter().find(|car| car.model == model)
}

fn main() {
    // Créez un garage contenant plusieurs voitures
    let mut garage = vec![
        Car::new("Renault Clio".to_string(), 2005),
        Car::new("Peugeot 206".to_string(), 1998),
        Car::new("Ford Mustang".to_string(), 1968),
    ];

    // Envoyer une voiture en réparation
    garage[0].send_to_repair();

    // Afficher toutes les voitures
    for car in &garage {
        println!(
            "Modèle: {}, Année: {}, Réparée: {}",
            car.model,
            car.year,
            if car.is_repaired { "Oui" } else { "Non" }
        );
    }

    // Rechercher une voiture et afficher le résultat
    match search_car("Renault Clio".to_string(), &garage) {
        Some(car) => println!("La voiture '{}' a été trouvée.", car.model),
        None => println!("Voiture non trouvée."),
    }

    // Vérifier si une voiture est vintage
    if garage[0].is_vintage() {
        println!("{} est une voiture vintage!", garage[2].model);
    }
}
