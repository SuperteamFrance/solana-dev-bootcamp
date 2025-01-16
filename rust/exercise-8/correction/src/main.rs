fn main() {

    let array = [1, 2, 3, 4, 5];
    let mut vecteur = Vec::new();

    vecteur.push(6);
    vecteur.push(7);
    vecteur.push(8);

    vecteur.remove(1);

    println!("Premier élément de l'array : {}", array[0]);
    println!("Premier élément du vecteur : {}", vecteur[0]);
    println!("Nombre total d'éléments dans l'array : {}", array.len());
    println!("Nombre total d'éléments dans le vecteur : {}", vecteur.len());
}