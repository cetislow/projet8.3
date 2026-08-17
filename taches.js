// ========================================
// 1. TABLEAU DES TÂCHES
// ========================================

let taches = [
    {
        id: 1,
        titre: "Apprendre JavaScript",
        priorite: "haute",
        terminee: false
    },
    {
        id: 2,
        titre: "Créer un portfolio",
        priorite: "moyenne",
        terminee: true
    },
    {
        id: 3,
        titre: "Faire les exercices JavaScript",
        priorite: "basse",
        terminee: false
    }
];


// ========================================
// 2. RÉCUPÉRER LES ÉLÉMENTS HTML
// ========================================

const sortie = document.querySelector("#sortie");

const total = document.querySelector("#total");

const terminees = document.querySelector("#terminees");

const taux = document.querySelector("#taux");

const progression = document.querySelector("#progression");


// ========================================
// 3. AFFICHER LES TÂCHES
// ========================================

function afficherTaches(liste = taches) {

    // Vider la zone d'affichage
    sortie.innerHTML = "";

    // Vérifier s'il n'y a aucune tâche
    if (liste.length === 0) {

        sortie.innerHTML = `
            <p class="aucune-tache">
                Aucune tâche à afficher.
            </p>
        `;

        return;
    }


    // Parcourir les tâches
    liste.forEach(function(tache) {

        sortie.innerHTML += `

            <article class="tache">

                <div class="gauche">

                    <h3 class="${tache.terminee ? "terminee" : ""}">
                        ${tache.titre}
                    </h3>

                    <span class="${tache.priorite}">
                        ${tache.priorite}
                    </span>

                </div>


                <div class="droite">

                    <button
                        class="btn valider"
                        onclick="terminerTache(${tache.id})"
                    >
                        ${tache.terminee ? "↩" : "✓"}
                    </button>


                    <button
                        class="btn supprimer"
                        onclick="supprimerTache(${tache.id})"
                    >
                        ✕
                    </button>

                </div>

            </article>

        `;

    });

}


// ========================================
// 4. METTRE À JOUR LES STATISTIQUES
// ========================================

function mettreAJourStatistiques() {

    // ------------------------------------
    // TOTAL
    // ------------------------------------

    const nombreTotal = taches.length;

    total.textContent = nombreTotal;


    // ------------------------------------
    // TÂCHES TERMINÉES
    // ------------------------------------

    const nombreTerminees = taches.filter(function(tache) {

        return tache.terminee === true;

    }).length;

    terminees.textContent = nombreTerminees;


    // ------------------------------------
    // TAUX DE COMPLÉTION
    // ------------------------------------

    let tauxCompletion = 0;

    if (nombreTotal > 0) {

        tauxCompletion =
            (nombreTerminees / nombreTotal) * 100;

    }

    tauxCompletion = Math.round(tauxCompletion);

    taux.textContent = `${tauxCompletion}%`;


    // ------------------------------------
    // BARRE DE PROGRESSION
    // ------------------------------------

    progression.style.width =
        `${tauxCompletion}%`;
}


// ========================================
// 5. AJOUTER UNE TÂCHE
// ========================================

function ajouterTache(titre, priorite = "moyenne") {

    // Vérifier le titre
    if (!titre || titre.trim() === "") {

        console.log("Le titre de la tâche est obligatoire.");

        return;
    }


    // Créer un nouvel identifiant
    const nouvelId =
        taches.length > 0
            ? Math.max(...taches.map(tache => tache.id)) + 1
            : 1;


    // Créer la nouvelle tâche
    const nouvelleTache = {

        id: nouvelId,

        titre: titre.trim(),

        priorite: priorite,

        terminee: false

    };


    // Ajouter au tableau
    taches.push(nouvelleTache);


    // Actualiser l'affichage
    afficherTaches();

    mettreAJourStatistiques();
}


// ========================================
// 6. SUPPRIMER UNE TÂCHE
// ========================================

function supprimerTache(id) {

    taches = taches.filter(function(tache) {

        return tache.id !== id;

    });


    // Actualiser
    afficherTaches();

    mettreAJourStatistiques();
}


// ========================================
// 7. TERMINER UNE TÂCHE
// ========================================

function terminerTache(id) {

    const tache = taches.find(function(tache) {

        return tache.id === id;

    });


    // Vérifier que la tâche existe
    if (!tache) {
        return;
    }


    // Inverser son état
    tache.terminee = !tache.terminee;


    // Actualiser
    afficherTaches();

    mettreAJourStatistiques();
}


// ========================================
// 8. FILTRER LES TÂCHES
// ========================================

function filtrerTaches(type) {

    let resultat;


    // ------------------------------------
    // TOUTES
    // ------------------------------------

    if (type === "toutes") {

        resultat = taches;

    }


    // ------------------------------------
    // EN COURS
    // ------------------------------------

    else if (type === "encours") {

        resultat = taches.filter(function(tache) {

            return tache.terminee === false;

        });

    }


    // ------------------------------------
    // TERMINÉES
    // ------------------------------------

    else if (type === "terminees") {

        resultat = taches.filter(function(tache) {

            return tache.terminee === true;

        });

    }


    // Afficher le résultat
    afficherTaches(resultat);
}


// ========================================
// 9. CONNECTER LES BOUTONS DE FILTRE
// ========================================

const boutonsFiltres =
    document.querySelectorAll(".filtres button");


boutonsFiltres.forEach(function(bouton) {

    bouton.addEventListener("click", function() {

        const texte =
            bouton.textContent.trim().toLowerCase();


        if (texte === "toutes") {

            filtrerTaches("toutes");

        }

        else if (texte === "en cours") {

            filtrerTaches("encours");

        }

        else if (texte === "terminées") {

            filtrerTaches("terminees");

        }

    });

});


// ========================================
// 10. AFFICHAGE INITIAL
// ========================================

afficherTaches();

mettreAJourStatistiques();