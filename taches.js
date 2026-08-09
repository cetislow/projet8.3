let	taches	=	[];
let	prochainId	=	1;
let	filtreActif	=	"toutes";
const	sortie	=	document.querySelector("#sortie");
//	---	Opérations	sur	les	données	--
function	ajouterTache(titre,	priorite)	{
taches.push({	id:	prochainId++,	titre,	priorite,	terminee:	false	});
rafraichir();
}
function	supprimerTache(id)	{
taches	=	taches.filter(t	=>	t.id	!==	id);
rafraichir();
}
function	basculerTermine(id)	{
taches	=	taches.map(t	=>	t.id	===	id	?	{	...t,	terminee:	!t.terminee	}	:	t);
rafraichir();
}
//	---	Filtrage	pour	l'affichage	--
function	tachesFiltrees()	{
if	(filtreActif	===	"encours")	return	taches.filter(t	=>	!t.terminee);
if	(filtreActif	===	"terminees")	return	taches.filter(t	=>	t.terminee);
return	taches;
}
//	---	Statistiques	(KPI)	--
function	calculerStatistiques()	{
const	total	=	taches.length;
const	terminees	=	taches.filter(t	=>	t.terminee).length;
const	taux	=	total	===	0	?	0	:	Math.round((terminees	/	total)	*	100);
return	{	total,	terminees,	taux	};
}
//	---	Affichage	d'une	tâche	--
function	ligneTache(tache)	{
return	`
<div	class="tache	priorite-${tache.priorite}	${tache.terminee	?	"terminee"	:	""}">
<span	class="titre-tache">${tache.titre}</span>
<span	class="actions-tache">
<button	onclick="basculerTermine(${tache.id})">✔</button>
<button	onclick="supprimerTache(${tache.id})"> </button>
</span>
</div>
`;
}
//	---	Rafraîchissement	global	:	liste	+	KPI	--
function	rafraichir()	{
sortie.innerHTML	=	tachesFiltrees().map(ligneTache).join("")	||	"<p>Aucune	tâche	à	afficher.</p>";
const	{	total,	terminees,	taux	}	=	calculerStatistiques();
document.querySelector("#kpi-total").textContent	=	total;
document.querySelector("#kpi-terminees").textContent	=	terminees;
document.querySelector("#kpi-taux").textContent	=	taux	+	"%";
document.querySelector("#barre-remplie").style.width	=	taux	+	"%";
}
//	---	Filtres	(boutons	déjà	branchés	cette	semaine)	--
document.querySelectorAll(".filtre").forEach(bouton	=>	{
bouton.addEventListener("click",	()	=>	{
filtreActif	=	bouton.dataset.filtre;
document.querySelectorAll(".filtre").forEach(b	=>	b.classList.remove("actif"));
bouton.classList.add("actif");
rafraichir();
});
});
//	Données	de	démarrage
ajouterTache("Réviser	les	fonctions	JavaScript",	"haute");
ajouterTache("Préparer	le	README	du	projet S8",	"moyenne");
ajouterTache("Relire	le	CSS	responsive",	"basse");