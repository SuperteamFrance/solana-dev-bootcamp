fn afficher_longueur(s: String) {
    println!("Longueur: {}", s.len());
}

fn main() {
    let s1 = String::from("Hello");
    afficher_longueur(s1);
    println!("{}", s1); // Erreur ici
}