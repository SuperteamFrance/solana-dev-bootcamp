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

    println!("Trip to {:?} using {:?}", trip.destination, trip.mode);
}