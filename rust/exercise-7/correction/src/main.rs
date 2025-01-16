fn afficher_message(message: &str) {
    println!("Message : {}", message);
}

fn main() {
    let prenom = "Julien";
    
    let mut prenom_modifiable = prenom.to_string();
    prenom_modifiable.push_str(" est présent!");

    // Afficher en String
    println!("{}", prenom_modifiable);

    // Afficher en &str
    afficher_message(prenom_modifiable.as_str());
}