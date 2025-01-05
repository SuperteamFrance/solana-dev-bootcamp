# Exercice 2 : Immutabilité et Mutabilité

## **1. Immutabilité**

En Rust, les variables sont immuables par défaut. Cela signifie qu'une fois déclarée, une variable ne peut pas être modifiée :

```rust
let x = 5;
x = 6; // Erreur ! x est immuable
```

---

## **2. Mutabilité**

Pour rendre une variable mutable, utilisez le mot-clé `mut` :

```rust
let mut y = 5;
y = 6; // Pas d'erreur, y est mutable
```

---

## **Exercice**

### Instructions
1. Créer une variable immuable `age` et essayer de modifier sa valeur (une erreur devrait apparaître).
2. Créer une variable mutable `score` et l'incrémenter de 10.

### Exemple attendu :
Le programme doit afficher :

```plaintext
Erreur lors de la modification de `age`
Score initial : 50
Score après modification : 60
```