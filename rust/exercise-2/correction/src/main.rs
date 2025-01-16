fn main() {
    // Déclarer ici la variable immuable age
    let mut age = 25;

    // Essayer de modifier age (doit générer une erreur)
    age = 14;

    // Déclarer ici la variable mutable score
    let mut score = 1;

    // Afficher les résultats
    println!("Score initial : {}", score);

    // Incrémenter score
    score+=1;
    
    println!("Score après modification : {}", score);
}