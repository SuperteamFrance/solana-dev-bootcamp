# Exercice 1 : Variables, Constantes et Types

## **1. Variables**

En Rust, une variable se déclare avec `let`.

```rust
let x = 5;
```

Le typage n'est pas obligatoire, car Rust peut inférer le type automatiquement. Par défaut :
- Les entiers sont de type `i32`.
- Les flottants sont de type `f64`.

Cependant, il est possible de spécifier le type manuellement :

```rust
let y: u32 = 10;
```

Il est également possible d'initialiser une variable sans lui attribuer de valeur immédiatement :

```rust
let z;
z = 10; // La variable z est initialisée plus tard
```

---

## **2. Constantes**

Les constantes se déclarent avec `const` :

```rust
const PI: f64 = 3.14159;
```

- Toujours typées explicitement.
- Toujours immuables.
- Nommées en majuscules par convention.

---

## **3. Types de Données**

Les principaux types de données en Rust sont :

### Types numériques
- Entiers non signés : `u8`, `u16`, `u32`, `u64`, `u128`
- Entiers signés : `i8`, `i16`, `i32`, `i64`, `i128`
- Différence : Les types `u` (unsigned) n'acceptent que des valeurs positives, tandis que les types `i` (signed) acceptent des valeurs positives et négatives.
- Flottants : `f32`, `f64`

### Booléens et caractères
- `bool` : `true` ou `false`
- `char` : caractère Unicode entre `''`

### Chaînes de caractères
- `&str` : chaîne de caractères statique
- `String` : chaîne dynamique

### Collections
- `Array` : tableau de taille fixe
- `Vec` : vecteur dynamique

---

## **Exercice**

### Instructions
1. Déclarer une variable immuable nommée `age` de type entier `u32` avec la valeur `25`.
2. Déclarer une constante nommée `MAX_SCORE` de type `u32` avec la valeur `100`.
3. Déclarer une variable `temperature` de type `i32` initialisée à `-5`.

Lancer le programme avec la commande : ```rustc main.rs```

### Exemple attendu :
Le programme doit afficher :

```plaintext
Votre âge : 25
Score maximum : 100
Température : -5
```