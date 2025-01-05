# Exercice 3 : Contrôle de Flux

## **1. Conditions (if/else)**

Les structures conditionnelles permettent d'exécuter du code selon certaines conditions :

```rust
let age = 18;
if age >= 18 {
    println!("Adulte");
} else {
    println!("Mineur");
}
```

---

## **2. Boucles (loop, while, for)**

### `loop`
Une boucle infinie :
```rust
let mut counter = 0;
loop {
    counter += 1;
    if counter == 5 {
        break;
    }
}
```

### `while`
Répète tant que la condition est vraie :
```rust
let mut counter = 0;
while counter < 5 {
    counter += 1;
}
```

### `for`
Iterer sur une plage :
```rust
for i in 0..5 {
    println!("i = {}", i);
}
```

---

## **Exercice**

### Instructions
1. Créer une variable `age` et afficher "Mineur" ou "Adulte" selon sa valeur.
2. Utiliser une boucle `for` pour afficher les nombres de 1 à 5.
3. Utiliser une boucle `while` pour compter à rebours de 5 à 1.

### Exemple attendu :
Le programme doit afficher :

```plaintext
Adulte
1
2
3
4
5
5
4
3
2
1
```