fn main() {
    let score = 8; // À modifier pour tester

    match score {
        10 => println!("Excellent!"),
        7..=9 => println!("Bien joué!"),
        4..=6 => println!("Peut mieux faire"),
        _ => println!("Échec..."),
    }
}