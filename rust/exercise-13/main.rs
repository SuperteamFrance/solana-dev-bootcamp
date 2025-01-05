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