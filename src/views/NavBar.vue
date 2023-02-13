<script setup>
import { ref } from "vue";

// -- donnée réactive pour la l'affichage de la page ajout
const showajout = ref("");
//les évenement émits par la composant
const emit = defineEmits(["listerlivres"]);

</script>

<template>

<div class="wrapper">
  <div class="sidebar">
      <ul>
        <li>
        <button  @click="$emit('listerlivres')" type="button" class="btn">Mes Livre </button>
        </li>
        <br/>
       
      </ul>
  </div>
</div>
</template>

<style scoped>


*{
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}



.wrapper{
  margin-top: -200px;
  margin-left: -200px;
  margin-top:-600px;
}


.wrapper .sidebar{
  left: 10px;
  width: 200px;
  border-bottom-left-radius: 20px;
  margin-top: 150px;
}


.btn{
  background: linear-gradient(132deg, rgb(0, 103, 154) 0.00%, rgb(0, 173, 239) 100.00%);
  color: #fff;
  margin: 30px 0;
  border-radius: 30px;
  transition: 0.5s;
  display: block;
  padding:11px;
  position: relative;
  margin-bottom: 1px;
  white-space: nowrap;
}

.btn:hover {
    background: linear-gradient(132deg, rgb(227, 244, 253) 0.00%, rgb(170, 209, 226) 100.00%);
}












</style>