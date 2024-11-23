const panier =[
    {
        nom: "HP",
        quantité: 4,
        prix:487
    },
    {
        nom:"Dell",
        quantité:3,
        prix:859
    },
    {
        nom:"Lenovo",
        quantité:2,
        prix:590
    },
    {
        nom:"Asus",
        quantité:3,
        prix:1199
    },
    {
        nom:"Acer",
        quantité:3,
        prix:949
    },
    {
        nom:"keyboard1",
        quantité:4,
        prix:47.38
    },
    {
        nom:"keyboard2",
        quantité:3,
        prix:37.87
    },
    {
        nom:"keyboard3",
        quantité:4,
        prix:23.69
    },
    {
        nom:"keyboard4",
        quantité:3,
        prix:29.62
    },
    {
        nom:"keyboard5",
        quantité:4,
        prix:10.06
    },
    {
        nom:"mouse1",
        quantité:5,
        prix:7.30
    },
    {
        nom:"mouse2",
        quantité:6,
        prix:7.10
    },
    {
        nom:"mouse3",
        quantité:4,
        prix:3.54
    },
    {
        nom:"mouse4",
        quantité:5,
        prix:7.99
    },
    {
        nom:"mouse5",
        quantité:5,
        prix:5.46
    },
    {
        nom:"headphone1",
        quantité:2,
        prix:17.75
    },
    {
        nom:"headphone2",
        quantité:4,
        prix:95.39
    },
    {
        nom:"headphone3",
        quantité:6,
        prix:71.56
    },
    {
        nom:"headphone4",
        quantité:1,
        prix:42.39
    },
    {
        nom:"headphone5",
        quantité:3,
        prix:102.2
    },
    
];
console.log(panier);

//l'affichage du contenu du panier
function afficherPanier() {
    const tableBody = document.querySelector("#panierTable tbody");
    tableBody.innerHTML = ""; // Vide le tableau avant de le remplir

    panier.forEach((produit) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${produit.nom}</td>
            <td>${produit.quantité}</td>
            <td>${produit.prix.toFixed(2)}$</td>
            <td>${(produit.quantité * produit.prix).toFixed(2)}$</td>
        `;
        tableBody.appendChild(row);
    });
}
afficherPanier();


//Ajouter un produit au panier
function ajouterProduit(nom, prix, quantité=1){
    const produitExistant = panier.find((produit) => produit.nom === nom);
    if (produitExistant) {
        produitExistant.quantité += quantité;
    } else {
        panier.push({ nom, quantité, prix });
    }
    console.log(`${nom} a été ajouté au panier.`);
    afficherPanier();
}

ajouterProduit("HP", 487, 2); // Exemple
ajouterProduit("MacBook", 1599, 1);

//la suppression d'un produit du panier
function supprimerProduit(nom){
    const index = panier.findIndex((produit) => produit.nom === nom);
    if (index !== -1) {
        panier.splice(index, 1);
        console.log(`${nom} a été supprimé du panier.`);
    } else {
        console.log(`${nom} n'est pas dans le panier.`);
    }
    afficherPanier();
}
supprimerProduit("HP");

//la modification de la quantité d'un produit
function modifierQuantité(nom, nouvelleQuantité) {
    const produit = panier.find((produit) => produit.nom === nom);
    if (produit) {
        if (nouvelleQuantité <= 0) {
            supprimerProduit(nom);
        } else {
            produit.quantité = nouvelleQuantité;
            console.log(`La quantité de ${nom} a été mise à jour à ${nouvelleQuantité}.`);
        }
    } else {
        console.log(`${nom} n'est pas dans le panier.`);
    }
    afficherPanier();
}
modifierQuantité("HP", 10); // Exemple
modifierQuantité("Dell", 0); // Supprime Dell du panier

//le calcul du total du panier
function calculerTotal() {
    const total = panier.reduce((somme, produit) => {
        return somme + produit.quantité * produit.prix;
    }, 0);
    console.log(`Le total du panier est de : ${total.toFixed(2)}$`);
    return total;
}
calculerTotal();

//la recherche d'un produit dans le panier
function rechercherProduit(nom) {
    const produit = panier.find((produit) => produit.nom === nom);
    if (produit) {
        console.log(`Produit trouvé : ${produit.nom} - Quantité : ${produit.quantité} - Prix : ${produit.prix.toFixed(2)}$`);
    } else {
        console.log(`${nom} n'est pas dans le panier.`);
    }
}
rechercherProduit("Lenovo"); // Exemple


//vider le panier
function viderPanier() {
    panier.length = 0; // Vide le tableau sans changer sa référence
    afficherPanier();
}
viderPanier(); // Exemple

function afficherTotal() {
    const total = calculerTotal();
    document.querySelector("#totalPanier").textContent = `Total: ${total.toFixed(2)}$`;
}
