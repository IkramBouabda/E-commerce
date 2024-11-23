// Variables globales
let panier = [];

// Fonction pour ajouter un produit au panier
function ajouterProduit(nom, prix, quantiteDisponible) {
    // Vérifie si le produit est déjà dans le panier
    let produitExistant = panier.find(p => p.nom === nom);
    if (produitExistant) {
        if (produitExistant.quantite < quantiteDisponible) {
            produitExistant.quantite += 1; // Incrémenter la quantité
        } else {
            alert("Stock épuisé pour ce produit !");
            return;
        }
    } else {
        // Ajouter un nouveau produit au panier
        panier.push({ nom: nom, prix: prix, quantite: 1, quantiteDisponible: quantiteDisponible });
    }

    // Mettre à jour l'affichage du panier
    afficherPanier();
}

// Fonction pour afficher le panier
function afficherPanier() {
    const panierTable = document.querySelector("#panierTable tbody");
    const totalPrixElement = document.getElementById("totalPrix");
    let totalPrix = 0;

    // Effacer le tableau avant de le reconstruire
    panierTable.innerHTML = "";

    panier.forEach((produit, index) => {
        let prixTotal = produit.prix * produit.quantite;
        totalPrix += prixTotal;

        // Ajouter une ligne pour chaque produit
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${produit.nom}</td>
            <td>
                <button onclick="modifierQuantite(${index}, -1)">-</button>
                ${produit.quantite}
                <button onclick="modifierQuantite(${index}, 1)">+</button>
            </td>
            <td>${produit.prix.toFixed(2)} $</td>
            <td>${prixTotal.toFixed(2)} $</td>
        `;
        panierTable.appendChild(row);
    });

    // Mettre à jour le total du panier
    totalPrixElement.textContent = totalPrix.toFixed(2);
}

// Fonction pour modifier la quantité d'un produit
function modifierQuantite(index, changement) {
    let produit = panier[index];

    // Vérifier les limites de stock
    if (changement === 1 && produit.quantite < produit.quantiteDisponible) {
        produit.quantite += 1;
    } else if (changement === -1 && produit.quantite > 1) {
        produit.quantite -= 1;
    } else if (changement === -1 && produit.quantite === 1) {
        // Supprimer le produit si la quantité atteint 0
        panier.splice(index, 1);
    } else {
        alert("Quantité non valide !");
    }

    // Mettre à jour l'affichage du panier
    afficherPanier();
}

// Fonction pour vider le panier
function viderPanier() {
    if (confirm("Voulez-vous vraiment vider le panier ?")) {
        panier = []; // Réinitialiser le panier
        afficherPanier(); // Mettre à jour l'affichage
    }
}

// Écouteur pour le bouton "Vider le Panier"
document.getElementById("viderPanier").addEventListener("click", viderPanier);

// Initialisation de l'affichage du panier au chargement de la page
afficherPanier();
document.querySelector('a[href="#panier"]').addEventListener('click', function (e) {
    e.preventDefault(); // Empêche le comportement par défaut du lien
    const panierSection = document.getElementById("panier");
    panierSection.scrollIntoView({ behavior: "smooth" }); // Fait défiler jusqu'au panier
});
