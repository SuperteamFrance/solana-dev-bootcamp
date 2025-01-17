
# Chapitre 14 : Tests unitaires en Rust


En Rust, un **test unitaire** consiste à vérifier qu’une fonction ou un morceau de code se comporte comme prévu. Pour cela :

- On place le code de test dans un module annoté `#[cfg(test)]`.
- Chaque test est une fonction annotée `#[test]`.
- On utilise généralement `assert_eq!(expr1, expr2)`, `assert_ne!(expr1, expr2)` ou `assert!(expr)` pour vérifier les résultats.
	- `assert!(expr)` permet de verifier si l'expression est `true`
	- `assert_eq!(expr1, expr2)` permet de verifier si les deux expressions sont égales.
	- `assert_ne!(expr1, expr2)` permet de verifier si les deux expressions sont inégales.

Pour exécuter tous les tests d’un projet :

```bash
cargo test
```

## 2. Exemple minimal

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
}

fn main() {
    println!("2 + 3 = {}", add(2, 3));
}
```

## 3. Exercice

-   Réaliser les tests unitaires pour la méthode is_palindrome

```rust
fn is_palindrome(s: &str) -> bool {
    let cleaned: String = s
        .to_lowercase()               
        .chars()
        .filter(|c| c.is_alphanumeric())
        .collect();

    cleaned == cleaned.chars().rev().collect::<String>()
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_simple_palindrome() {}
    
    #[test]
    fn test_not_palindrome() {}

    #[test]
    fn test_palindrome_with_spaces_and_caps() {}
}

fn main() {
    let word = "Kayak";
    println!("Is '{}' a palindrome? {}", word, is_palindrome(word));
}
```