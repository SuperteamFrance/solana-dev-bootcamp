use rand::Rng;

pub fn generate_number() -> u32 {
    // Crée un générateur de nombres aléatoires
    let mut rng = rand::thread_rng();
    
    // Génère un nombre aléatoire entre 1 et 100 (inclus)
    rng.gen_range(1..=100)
}
