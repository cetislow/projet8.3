

```markdown
#  Gestionnaire de tâches

Projet 8.3 — Akieni Academy — Phase 2 — Semaine 8

##  Présentation

Le **Gestionnaire de tâches** est une application web permettant de
gérer une liste de tâches et de suivre leur progression.

Chaque tâche est représentée par un objet JavaScript possédant un
identifiant unique.

L'application permet d'ajouter, terminer et supprimer des tâches tout
en recalculant automatiquement les statistiques du tableau de bord.

---

##  Objectifs

Le projet permet de pratiquer :

- les objets JavaScript ;
- les tableaux ;
- les fonctions ;
- `map()` ;
- `filter()` ;
- `reduce()` ;
- la modification d'un tableau ;
- les identifiants uniques ;
- la génération dynamique du HTML ;
- le calcul de statistiques.

---

##  Principe

Chaque tâche possède un identifiant unique.

Exemple :

```javascript
{
    id: 1,
    titre: "Réviser les boucles JavaScript",
    priorite: "haute",
    terminee: false
}