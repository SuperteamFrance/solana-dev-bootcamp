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
