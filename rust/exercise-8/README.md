
# Exercice 8 : Arrays et Vecteurs


## **1. Les Arrays**

Un **array** (tableau) est une collection de taille fixe et de type homogène. 

### **Déclaration et Accès :**
```rust
let mut a: [i8; 5] = [0; 5];
let mut b: [i8; 5] = [1, 2, 3, 4, 5];
let fruits = ["pomme", "cerise", "fraise"];

println!("Le premier fruit est : {}", fruits[0]);
```

### **Caractéristiques :**
- Taille fixée à la compilation.
- Tous les éléments doivent être du même type.

---

## **2. Les Vecteurs (Vec)**

Un **vecteur** (`Vec`) est une collection dynamique, pouvant changer de taille. 

### **Déclaration et Accès :**
```rust
let tab: Vec<&str> = vec!["pomme", "cerise", "fraise"];

let mut numbers = Vec::new();
numbers.push(1);
numbers.push(2);
numbers.push(3);

println!("Le premier élément est : {}", numbers[0]);

match numbers.get(2) {
    Some(&number) => println!("Le troisième élément est : {}", number),
    None => println!("Pas d'élément à cet index.")
}
```

### **Caractéristiques :**
- Taille dynamique.
- Méthodes : `.push()`, `.pop()`, `.len()`, `.remove()`, `.insert()`.
- Utilise `Option` pour un accès sécurisé hors limites.

---

## **3. Itération sur Arrays et Vec**

### **Array :**
```rust
let fruits = ["pomme", "cerise", "fraise"];
for fruit in &fruits {
    println!("Fruit : {}", fruit);
}
```

### **Vec :**
```rust
let numbers = vec![1, 2, 3];
for number in &numbers {
    println!("Nombre : {}", number);
}

for number in numbers.iter() {
    println!("Nombre via iter : {}", number);
}
```
Lorsqu'on utilise `&numbers` ou `.iter()`, on crée une référence vers le vecteur au lieu de le consommer. Cela permet d'éviter de transférer l'ownership et de continuer à utiliser `numbers` après l'itération.

---
## **4. Exercice : Manipulation d'Arrays et Vecteurs**

### Instructions
1. Créez un array contenant les nombres `1, 2, 3, 4, 5`.
2. Créez un vecteur vide, ajoutez-y les nombres `6, 7, 8`.
3. Supprimez le deuxième élément du vecteur.
4. Affichez le premier élément de chaque collection.
5. Affichez le nombre total d'éléments dans l'array et dans le vecteur.

### Exemple attendu :
```plaintext
Premier élément de l'array : 1
Premier élément du vecteur : 6
Nombre total d'éléments dans l'array : 5
Nombre total d'éléments dans le vecteur : 2
```