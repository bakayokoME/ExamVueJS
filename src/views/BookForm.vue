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
                    
                    <td>
                        <button  @click="StartProduits(data.links.first.href)"  type="button" class="btn btn-large btn-block btn-success" style=" margin-left: 50px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        </button>
                    </td>

                    <td>
                    <button @click="StartProduits(data.links.self.href)"   type="button" class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                    </button>
                    </td>

                    <td>
                    <button @click="StartProduits(data.links.next.href)"   type="button" class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                    </button>
                    </td>

                   <td>
                        <button  @click="StartProduits(data.links.last.href)"  type="button" class="btn btn-large btn-block btn-success" style="margin-left: auto;margin-right: auto;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        </button>
                    </td>

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
            console.log(data.links);
            console.log(data.links.next.href);
            console.log(data.listeProduits);
        })
        .catch((error) => alert(error.message));
}

function StartProduits(url) {
     // Appel à l'API pour avoir la liste des catégories
    // Trié par code, descendant
    // Verbe HTTP GET par défaut
    console.log("La page en question",url);
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