<script setup>

//les évenement émits par la composant
const emit = defineEmits(["show",'voir']);

</script>

<template>

<div class="wrapper">
  <div class="sidebar">
      <ul>
        <li><a href="#" class="active">
          <span class="icon"><i class="fas fa-blog"></i></span>
          <span class="title">Mes Livre </span>
          </a></li>

          <li><a>
            <span @click="$emit('show')"  class="title">Ajouter un Livre </span>
          </a></li>

          <li><a href="#">
          <RouterLink to="/about" class="title">Modifier un livre</RouterLink>
          </a></li>

          <li><a href="#">
          <RouterLink to="/about" class="title">Supprimer un livre</RouterLink>
          </a></li>

      </ul>
  </div>
</div>
</template>

<style scoped>


*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

body{
  background: #e1ecf2;
}

.wrapper{
  margin-top: -200px;
  margin-left: -200px;
  margin-top:-600px;


}


.wrapper .sidebar{
  top: 70px;
  left: 10px;
  background: linear-gradient(132deg, rgb(0, 103, 154) 0.00%, rgb(0, 173, 239) 100.00%);
  width: 200px;
  height: calc(100% - 80px);
  border-bottom-left-radius: 20px;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.wrapper .sidebar ul li a{
    display: block;
    padding: 20px;
    color: #fff;
    position: relative;
    margin-bottom: 1px;
    color: white;
    white-space: nowrap;
    
}

.wrapper .sidebar ul li a:before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: #92a6e2;
  display: none;
}

.wrapper .sidebar ul li a span.icon{
  margin-right: 10px;
  display: inline-block;
}

.wrapper .sidebar ul li a span.title{
  display: inline-block;
}

.wrapper .sidebar ul li a:hover,
.wrapper .sidebar ul li a.active{
background: linear-gradient(132deg, rgb(227, 244, 253) 0.00%, rgb(170, 209, 226) 100.00%);
  color: black;
}

.wrapper .sidebar ul li a:hover:before,
.wrapper .sidebar ul li a.active:before{
  display: block;
}



.wrapper.collapse .sidebar{
  width: 70px;
}

.wrapper.collapse .sidebar ul li a{
  text-align: center; 
}

.wrapper.collapse .sidebar ul li a span.icon{
  margin: 0;
}

.wrapper.collapse .sidebar ul li a span.title{
  display: none;
}

.wrapper.collapse .main_container{
  width: (100% - 70px);
  margin-left: 70px;
}


</style>