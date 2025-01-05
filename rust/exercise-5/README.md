# Exercice 5 : Scope

## **1. Définition du Scope**

Le scope (ou portée) définit la partie du programme où une variable ou fonction est accessible.

### **Visibilité :**
- Une variable est uniquement accessible dans le scope où elle a été déclarée.

### **Durée de vie :**
- Une variable n'existe que tant que son scope est actif.
- À la fin du scope, la mémoire associée est libérée.

---

## **Exemple**

Analysez le code suivant :

```rust
fn main() {
    let mut x = 10;
    println!("Étape 1 : {}", x);

    {
        let x = x * 2;
        println!("Étape 2 : {}", x);

        let y = 5;
        println!("Étape 3 : {}", y);

        // Pourquoi l'instruction suivante provoque-t-elle une erreur ?
        // y += 3;

        println!("Étape 4 : {}", y);
    }

    x = x + 5;
    println!("Étape 5 : {}", x);

    // println!("Étape 6 : {}", y); // Pourquoi cette ligne est-elle commentée ?
}
```

---

## **Exercice : Devinez la sortie**

Déterminez la valeur affichée à chaque étape (Étape 1 à Étape 5). Écrivez vos réponses avant de tester le code.

### Question Bonus :
- Pourquoi la tentative d'incrémentation de `y` provoque-t-elle une erreur ?
- Pourquoi l'instruction `println!("Étape 6 : {}", y);` est-elle commentée ?
