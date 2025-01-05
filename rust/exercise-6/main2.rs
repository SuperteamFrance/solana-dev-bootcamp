fn doubler(s: &mut String) {
    s.push_str(s);
}

fn main() {
    let mut s = String::from("Hello");
    let r1 = &s;
    doubler(&mut s); // Erreur ici
    println!("{}", r1);
}