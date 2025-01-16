fn main() {
    // Appeler ici la fonction hello_world
    hello_world();

    // Appeler ici la fonction double et afficher le résultat
    let resultat = double(4);
    println!("Valeur {}", resultat);

    // Appeler ici la fonction est_pair et afficher le résultat
    est_pair(3)
}

// Déclarer ici la fonction hello_world
fn hello_world(){
    println!("hello world");
}

// Déclarer ici la fonction double
fn double(chiffre: u32)-> u32 {
    chiffre * 2
}

// Déclarer ici la fonction est_pair
fn est_pair(chiffre: u32)-> bool {
    chiffre % 2 == 0
}