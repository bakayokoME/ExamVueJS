<script setup>
import NavBar from './NavBar.vue';
import { ref } from "vue";
import { reactive, onMounted } from "vue";
import { BACKEND, doAjaxRequest } from "../api";

const titre = ref("");
const prix = ref("");
const qtestock = ref(0);


const emit = defineEmits(["addCajout"]);

// -- donnée réactive pour la saisie du titre,prix et quantite du livre;



</script>

<template>
    <div>
        
		<div class="wrapper" >
			<div class="inner">
				<form @submit.prevent="$emit('addCajout', titre,prix,qtestock)" >
					<h3>Ajouter un Livre</h3>
					<div class="form-group">
						<div class="form-wrapper">
							<label for="">Titre du Livre</label>
							<input  v-model="titre" placeholder="titre" type="text" class="form-control">
						</div>
						<div class="form-wrapper">
							<label for="">Prix</label>
							<input id="prix"  v-model="prix" type="text" class="form-control">
						</div>
					</div>
					<div class="form-wrapper">
						<label for="">Quantité en stock</label>
						<input id="qtestock"  v-model="qtestock" type="number" min="0" class="form-control">
					</div>
					<button>Ajouter livre</button>
				</form>
			</div>
		</div>
    </div>

</template>

<style scoped>



input, textarea, select, button {
  font-family: "Poppins", sans-serif;
  color: #333;
  font-size: 13px; 
}


.wrapper {
  position: static;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center; 
  margin-right: 50px;
  margin-top: 410px;
  margin-bottom: 100px;

}

.inner {
  min-width: 850px;
  margin: auto;
  padding-top: 68px;
  padding-bottom: 48px;

}

  .inner h3 {
    text-transform: uppercase;
    font-size: 22px;
    font-family: "Poppins", sans-serif;
    text-align: center;
    margin-bottom: 32px;
    color: #333;
    letter-spacing: 2px; }

form {
  width: 50%;
  padding-left: 45px; }

.form-group {
  display: flex; }
  .form-group .form-wrapper {
    width: 50%; }
    .form-group .form-wrapper:first-child {
      margin-right: 20px; }

.form-wrapper {
  margin-bottom: 17px; }
  .form-wrapper label {
    margin-bottom: 9px;
    display: block; }

.form-control {
  border: 1px solid #ccc;
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  font-family: "Muli-Bold";
  background: none; }
  .form-control:focus {
    border: 1px solid linear-gradient(132deg, rgb(0, 103, 154) 0.00%, rgb(0, 173, 239) 100.00%); }


button {
  border-radius: 30px;
  width: 152px;
  height: 40px;
  margin: auto;
  margin-top: 29px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #ff523b;
  font-size: 13px;
  color: #fff;
  text-transform: uppercase;
  font-family: "Poppins";
  border-radius: 20px;
  overflow: hidden;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
 }
  
  button:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f11a09;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out; 
}

  button:hover:before {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
    transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
   }

  .inner {
    min-width: 768px; } 
  .inner {
    min-width: auto;
    background: none;
    padding-top: 0;
    padding-bottom: 0; }

  form {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px; 
} 

</style>