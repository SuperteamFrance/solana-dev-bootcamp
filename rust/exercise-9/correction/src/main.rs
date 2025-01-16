fn main() {
    // Créez un livre en utilisant la méthode create
    let book = Book::create("Les Misérables", "Victor Hugo", 1862);

    // Affichez le résumé avec la méthode summary
    book.summary();
}

struct Book {
    title: String, 
    author: String,
    year: u32
}

impl Book {
    fn create(title: &str, author: &str, year: u32) -> Book {
        Book {
            title: title.to_string(),
            author: author.to_string(),
            year: year // pareil que year tout court
        }
    }

    fn summary(&self){
        println!("Le livre {} de {}, publié en {}", self.title, self.author, self.year);
    }
}