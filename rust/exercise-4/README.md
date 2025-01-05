
# Exercice 4 : Fonctions


## **1. Déclaration de Fonction**

Une fonction en Rust se déclare avec le mot-clé `fn`. Exemple de fonction qui additionne deux nombres :

```rust
fn addition(a: i32, b: i32) -> i32 {
    a + b
}
```

- **`fn`** : mot-clé pour déclarer une fonction.
- **`a: i32` et `b: i32`** : les paramètres avec leurs types.
- **`-> i32`** : type du retour.
- **Le retour implicite** : le dernier `a + b` est retourné automatiquement sans `return`.

---

## **2. Appeler une Fonction**

```rust
fn main() {
    let resultat = addition(5, 3);
    println!("Le résultat est : {}", resultat);
}
```

---

## **Exercice**

### Instructions
1. Créer une fonction `hello_world` qui affiche "Hello World!" sans paramètre ni retour.
2. Créer une fonction `double` qui prend un nombre et retourne son double.
3. Créer une fonction `est_pair` qui retourne `true` si un nombre est pair et `false` sinon.
4. Appeler ces fonctions dans `main` et afficher les résultats.

### Exemple attendu :

```plaintext
Hello World!
Le double de 3 est 6
4 est un nombre pair
5 est un nombre impair
```