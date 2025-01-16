fn doubler(s: &mut String) {
    s.push_str(&s.clone());
}

fn main() {
    let mut s = String::from("Hello");
    {
        let r1 = &s;
        println!("{}", r1);
    }
    doubler(&mut s); // Erreur ici
}