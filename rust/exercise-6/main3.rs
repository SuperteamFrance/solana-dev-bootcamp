fn obtenir_longueur(s: &String) -> usize {
    s.len()
}

fn main() {
    let mut s = String::from("Hello");
    let r1 = &mut s;
    println!("Longueur: {}", obtenir_longueur(&s)); // Erreur ici
}