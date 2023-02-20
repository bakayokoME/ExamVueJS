
<script setup>
import { reactive, onMounted } from "vue";
import { BACKEND, doAjaxRequest } from "../api";
import { RouterLink, RouterView } from 'vue-router'
import { ref } from "vue";


import NavBar from "./NavBar.vue";
import BookForm from "./BookForm.vue";
// Pour réinitialiser le formuaire de livre

let livreajouter = false;
let data = reactive({
    // Les données saisies dans le formulaire
    // La liste des livres affichée sous forme de table
    listeLivres: []
});

const motcle = ref("");


function chargeLivres() {
    // Appel à l'API pour avoir la liste des listes
    // Trié par code, descendant
    // Verbe HTTP GET par défaut
    doAjaxRequest(BACKEND)
        .then((json) => {
            console.log(json);
            data.listeLivres = json;
        })
        .catch((error) => alert(error.message));
}


function ajouteLivre(titre,prix,qtestock) {
  console.log(titre);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({titre: titre, prix: prix, qtestock : qtestock }),
  };
  fetch(BACKEND , fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      // livreajouter = true;
      chargeLivres();
    })
    .catch((error) => console.log(error));
}


function rechercherLivre(motcle) {
  //je passe le mot à trouver
  console.log("le mot : ",motcle);
  doAjaxRequest(BACKEND + `?search=${motcle}`)
        .then((json) => {
          data.listeLivres = json;
        })
        .catch((error) => alert(error.message));
}


/**
 * Supprime une entité
 * @param id l'URI de l'entité à supprimer
 */
function deleteLivre(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id du livre à supprimer doit être
  //  ajouté à la fin de l'url
  fetch(BACKEND + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      chargeLivres();
    })
    .catch((error) => console.log(error));
}

function modifierLivreajout(livre) {
  // modifier le  modifier uniquement le stock 
  // rajouter 1 
  // -- entête http pour la req AJAX
  console.log("la nouvel qtite",livre.qtestock);
  livre.qtestock +=1;
  console.log("la nouvel qtite",livre.qtestock);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- le livre modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(livre),
  };
  // -- la req AJAX
  fetch(BACKEND, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // actualiser la liste des livres
      chargeLivres();
    })
    .catch((error) => console.log(error));
}

function modifierLivresupprimer(livre) {
    // modifier le   uniquement le stock 
  // enlever  1
  console.log("la nouvel qtite",livre.qtestock);
  livre.qtestock -= 1;
  console.log("la nouvel qtite",livre.qtestock);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- le livre modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(livre),
  };
  // -- la req AJAX
  fetch(BACKEND, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log("essayon ici",livre.qtestock);
      //si la quantité en stock est égale à zeros il y a suppression du livre
      if (livre.qtestock == 0 ) {
        deleteLivre(livre.id);
        console.log("Suppression reussie !");
      }
      // actualiser la liste des choses
      chargeLivres();
    })
    .catch((error) => console.log(error));
}


// A l'affichage du composant, on affiche la liste
onMounted(chargeLivres);

</script>

<template>
  
<main>
    
    <div class="header">
      <div class="container">
        <div class="navbar">
          <div class="logo">
                <a href="index.html">
                <img src="../assets/images/logoisis.png"  width = "184" height = "180" alt="EbookStore-Logo"
                /></a>
          </div>
          <!----------  Nav Bar ------------------>
          <nav>
            <ul id="MenuItems">
              <li><a href="index.html">Acceuil</a></li>
              <li><a href="#small-container">Livre</a></li>
              <li><a href="">A propos</a></li>
              <li><a href="">Contact</a></li>
              <li><a href="account.html">Se connecter</a></li>
            </ul>
          </nav>
          <a href="cart.html">
            <img
              src="../assets/images/cart.png"
              alt="Shoping Cart"
              width="28px"
              height="28px"
              style="margin-left: 10px; margin-top: 15px"
            />
          </a>
          <img src="../assets/images/menu.png" class="menu-icon" onclick="menutoggle()" />
        </div>
        <div class="row">
          <div class="col-2">
            <h1>
             Bienvenue ! <br />
              Dans ma petite librairie 
            </h1>
            <p>
                ISIS FIE3 - Technologies du Web - le langage Javascript – API & AJAX <br />
                Mini-projet 2022-2023
            </p>
            <a href="ebooks.html" class="btnpp">Voir plus &#x27F6;</a>
          </div>
          <div class="col-2">
            <img src="../assets/images/baklogo.png " alt="Header Pic" />
          </div>
        </div>
      </div>
    </div>
    <!----------------featured categories -------------------->

    <!----------------featured Books -------------------->   
      <button @click="rechercherLivre(motcle.value)" type="button" title = "button" class="btnsearch" >Rechercher</button>
      <input type="text" ref="motcle" id="inputrech" class="form-control" value="" required="required" >     
     <div class="small-container">
        <h2 class="title">Mes Livres </h2>
        <div  id="slider" class="row">
              <div v-for="livre in data.listeLivres" :key="livre.id" class="col-4"> 
                  <div class="slide">
                    <img src="../assets/images/Book 4.jpg" alt="Book 4"/>               
                    <h3 class="labelone">Prix : {{ livre.prix }} €</h3>
                    <span class="labeltw" > Titre : {{ livre.titre }} </span><br>  
                    <span class="labeltr"> Qte en Stock : {{ livre.qtestock }} </span>  
                    <button class="btnsupprimer" @click="deleteLivre(livre.id)">Supprimer</button>
                    <button class="btnup" @click="modifierLivreajout(livre)">+</button>
                    <button class="btndown" @click="modifierLivresupprimer(livre)">-</button>
                  </div>
              </div> 
              
         </div>
            <h3 id= "succestrue" class="success" v-if="livreajouter"  >Livre Ajouter !!!</h3>
         <NavBar @listerlivres="chargeLivres" ></NavBar>
        </div>
     <BookForm @addCajout="ajouteLivre" ></BookForm>
     
</main>
</template>

<style scoped>

main{
    margin-left: -70px;
    margin-right: auto;
    width: 100em;
}

.form-control{
  border-radius: 30px;
  width: 90px;
  height: 50px;
  box-sizing: border-box;

}

.labelone{
  margin-top: 12px;
  margin-left: 75px;
}
.success{
  padding: 2em;
  background-color: #CBDEDD;
  display: block;
  color: black;
  margin-top: 23px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px
}


.form-control{
  width: 500px;
  margin-left: 390px;
  margin-top: 45px;
}

.btnsupprimer{
  display: inline-block;
  background: #ff523b;
  color: #fff;
  padding: 8px 30px;
  margin: 30px 0;
  border-radius: 30px;
  transition: 0.5s;
  margin-left: 50px;
  cursor:pointer;
}

.btnup {
  width:20px;
  cursor:pointer;
  margin-left: 2px;

}

.btndown{
  width:20px;
  cursor:pointer;
  margin-left: 3px;
}




.btnsearch{
  position:absolute;
  display:inline-block;
  background: #ff523b;
  color: #fff;
  padding: 8px 30px;
  margin: 30px 2px;
  border-radius: 30px;
  transition: 0.5s;
  margin-left: 920px;
  cursor:pointer;
}

#slider{
  width: 1000px;
  height: 500px;
  margin-left: 12px;
  display: flex;
  overflow-x: auto;
  text-align: center;
}


.col-4 {
  flex-basis: 25%;
  padding: 10px;

}


.labeltw{
    margin-left: 50px;
    margin-top: 150px;
}

.labeltr{
  margin-left: 75px;
  margin-top: 150px;
}


*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Poppins", sans-serif;
}
.navbar {
  display: flex;
  align-items: center;
  padding: 20px;
  margin-left: -30px;
  padding-left: 40px;
  padding-right: 400px;
}
nav {
  flex: 1;
  text-align: right;
  margin-left: -px;
}
nav ul {
  display: inline-block;
  list-style-type: none;

}
nav ul li {
  display: inline-block;
  margin: 20px;
  margin-left: 40px;
}
a {
  text-decoration: none;
  color: white;
}
p {
  color: white;
}
.container {
  max-width: 1300px;
  margin: auto;
  padding-left: 25px;
  padding-right: 25px;
  
}

.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
}
.col-2 {
  flex-basis: 50%;
  min-width: 300px;
}
.col-2 img {
  max-width: 100%;
  padding: 50px 0;
  margin-bottom: -50px;
}
.col-2 h1 {
  font-size: 50px;
  line-height: 60px;
  margin: 25px 0;
  color:white;
  margin-top: -120px;

}
.btnpp{
  display: inline-block;
  background: #ff523b;
  color: #fff;
  padding: 8px 30px;
  margin: 30px 0;
  border-radius: 30px;
  transition: 0.5s;
}



.header {
    background: linear-gradient(132deg, rgb(0, 103, 154) 0.00%, rgb(0, 173, 239) 100.00%);
    margin-bottom: 12px;
}
.header .row {
  margin-top: 0px;
  
}
.btn:hover {
    background: linear-gradient(132deg, rgb(227, 244, 253) 0.00%, rgb(170, 209, 226) 100.00%);
}

.col-3 {
  flex-basis: 30%;
  min-width: 250px;
  margin-bottom: 30px;
  max-width: 280px;
  height: 400px;
}
.col-3 img {
  width: 100%;
}
.small-container {
  max-width: 1080px;
  margin-right: auto;
  margin-left: auto;

}

@keyframes defilement1{
    0%{transform: translate(0,0);}
    100%{transform: translate(-2880px,0);}
}





.col-4 img {
  width: 100%;
}
.title {
  text-align: center;
  margin: 0 auto 40px;
  margin-left: -80px;
  padding-top: 30px;
  position: relative;
  line-height: 60px;
  color: #555;
  cursor:pointer;

}
.title::after {
  content: "";
  background: #ff523b;
  width: 80px;
  height: 5px;
  border-radius: 5px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

h4 {
  color: white;
  font-weight: normal;
}
.col-4 p {
  font-size: 14px;
}

.col-4:hover {
  transform: translateY(-5px);
}
/* --------------offer-------------- */
.offer {
  background: radial-gradient(#fff, #ffd6d6);
  margin-top: 80px;
  padding: 30px 0;
}
.col-2 .offer-img {
  padding: 50px;
}
small {
  color: #555;
}

.label-info{
margin-left: 45px;
}

</style>