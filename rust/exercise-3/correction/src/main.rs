fn main() {
    // Déclarer age et tester la condition
    let age = 18;
    if age >= 18 {
        println!("Adulte");
    } else {
        println!("Mineur");
    }

    // Boucle for pour compter de 1 à 5
    let end = 6;
    for i in 1..end {
        println!("ma valeur {}", i);
    }

    // Boucle while pour compter à rebours de 5 à 1
    let mut countdown = 5;
    while countdown > 0 {
        println!("ma valeur {}", countdown);
        countdown -= 1;
    }
}