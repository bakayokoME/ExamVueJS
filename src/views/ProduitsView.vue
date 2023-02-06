<template>
    <main>
        <div>
            <table class="styled-table">
                <caption>Liste des Produits</caption>
                <tr>
                    <th>Nom</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>Commandés</th>
                </tr>    
                <!-- Si le tableau des catégories n'est pas vide -->
                <tr v-for="produit in data.listeProduits" :key="produit.reference">
                    <td>{{ produit.nom }}</td>
                    <td>{{ produit.prixUnitaire }}</td>
                    <td>{{ produit.unitesEnStock }}</td>
                    <td>{{ produit.unitesCommandees }}</td>
                </tr>
                <tr v-if="data.listeProduits">
                    <td><button @click="chargeProduits(data.first.href)">premier <i class='fas fa-angle-right'></i></button></td>
                    <td><button @click="nextProduits(prev.href)" >prec <i class='fas fa-angle-right'></i></button></td>
                    <td><button @click="chargeProduits(data.next.href)"> suiv <i class='fas fa-angle-right'></i></button></td>
                    <td><button @click="chargeProduits(data.last.href)">dernier <i class='fas fa-angle-right'></i></button></td> 
                </tr>

                
            </table>
        </div>
    </main>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { BACKEND, doAjaxRequest } from "../api";

// Pour réinitialiser le formuaire

let data = reactive({
    // Les données saisies dans le formulaire
    // formulaireCategorie: { ...categorieVide },
    // La liste des catégories affichée sous forme de table
    listeProduits: [],
    links: {},
    page: {}
});

function chargeProduits() {
     // Appel à l'API pour avoir la liste des catégories
    // Trié par code, descendant
    // Verbe HTTP GET par défaut
    doAjaxRequest(BACKEND + "/api/produits?page=0&size=5")
        .then((json) => {
            data.listeProduits = json._embedded.produits;
            data.links = json._links;
            console.log(data.listeProduits);
            console.log(data.links);
        })
        .catch((error) => alert(error.message));
}

function nextProduits(url) {
     // Appel à l'API pour avoir la liste des catégories
    // Trié par code, descendant
    // Verbe HTTP GET par défaut
    doAjaxRequest(url)
        .then((json) => {
            data.listeProduits = json._embedded.produits;
            data.links = json._links;
            console.log(data.listeProduits);
            console.log(data.links);
        })
        .catch((error) => alert(error.message));
}


/**
 * Supprime une entité
 * @param entityRef l'URI de l'entité à supprimer
 */


// A l'affichage du composant, on affiche la liste
onMounted(chargeProduits);



</script>


<style scoped>

.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

td,
th {
    border: 1px solid #ddd;
    padding: 8px;
}


.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}


th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #232623;
    color: rgb(255, 255, 255);
}

.fa-arrow-circle-right {
    font-size:48px;
    color:red;
}
</style>