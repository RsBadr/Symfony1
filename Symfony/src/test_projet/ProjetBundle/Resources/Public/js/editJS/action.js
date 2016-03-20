
var projet = new Project('Faire le tour du monde', "J'ai 2 mois pour voir le plus de choses possibles ; 2 mois, c'est rien ! Il va falloir que je me dépeche !");


function loadProjet () {
    vueActive = new VueListeProjet(projet, $('#vueProjet'));
    vueActive.controller.begin();
}

function getXML() {
    return projet.getXML();
}

$(function() {
    loadProjet();
});