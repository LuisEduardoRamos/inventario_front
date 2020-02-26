<template>
  <div id="app">

    <div class="main-container" >
     
      <div class="topbar">
        <img src="Logo.png" alt="logo" width="56px">
        <img class="avatar" src="https://lasillarotarm.blob.core.windows.net/images/2019/06/09/lafotoineditadejosejosequegeneracontroversiaporestarenlacamacondosmujeres-focus-0-0-983-557.jpg">
      </div>
      <div class="left-menu">
        <div class="option">
            <router-link to="/provedores">Proveedores</router-link>
        </div>
        <div class="option">
            <router-link to="/pedidos">Pedidos</router-link>
        </div>
        <div class="option">
            <router-link to="/productos">Productos</router-link>
        </div>
         <div class="option">
            <router-link to="/categoria">Categorias</router-link>
        </div>
        <!-- <div class="option">
            <router-link to="/ordenar">Ordenar</router-link>
        </div> -->
        <div class="option">
            <router-link to="/inventario">Inventario</router-link>
        </div>
        <div class="option">
          <router-link to="/sucursales">Sucursales</router-link>
        </div>
        <div class="option">
          <router-link to="/usuarios">Usuarios</router-link>
        </div>
      </div>
      <div class="right-section">

        <router-view></router-view>

      </div>
      
    </div>
   
  </div> 
</template>

<script>

import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      login: false,
      sesion: {usuario: '', password:''},
      usuarios: {}
    }
  },
  methods:{
    ingresar() {
      this.axios.post('/usuario/login', this.sesion)
        .then(res => {
          console.log("datos",res.data)
          if(this.sesion.usuario === res.data.nombreUsuario){
            if(this.sesion.password === res.data.password){
              this.login = true
            }
          }else{
              console.log("Usuario Invalido",this.sesion)
          }
      })
      .catch( e => {
          console.log(e.response);
          console.log("Ho rayos")
      })
      this.sesion.correo = "";
      this.sesion.contraseña ="";
   
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main-container {
  display: flex;
}

.left-menu {
  min-height: 100vh;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px 0px;
  width: 236px;
  padding: 40px 8px;
  padding-top: 100px;
}

.left-menu .option {
  width: 100%;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
  display: flex;
  padding: 10px 16px;
  border-radius: 12px;
  transition: background 0.25s ease 0s;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.25s ease 0s;
}

.left-menu .option:hover, .left-menu .active {
  background: #d0d6ff !important;
  color: #102082 !important;
}

.right-section {
  width: calc(100% - 236px);
  padding: 120px 32px 24px;
}

.topbar {
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.topbar .avatar {
  object-fit: cover;
  width: 35px;
  height: 35px;
  margin-left: 32px;
  border-radius: 50%;
}

.table-section {
  background: white;
  /* box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12); */
}

h2 {
  margin-bottom: 24px;
}

.add-button {
  position: fixed;
  bottom: 32px;
  right: 32px;
  padding: 6px 16px;
  min-width: 64px;
}

.form-control {
		min-height: 41px;
		background: #f2f2f2;
		box-shadow: none !important;
		border: transparent;
	}
	.form-control:focus {
		background: #e2e2e2;
	}
	.form-control, .btn {        
        border-radius: 2px;
    }
	.login-form {
		width: 350px;
		margin: 30px auto;
		text-align: center;
	}
	.login-form h2 {
        margin: 10px 0 25px;
    }
    .login-form form {
		color: #7a7a7a;
		border-radius: 3px;
    	margin-bottom: 15px;
        background: #fff;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
    .login-form .btn {        
        font-size: 16px;
        font-weight: bold;
		background: #3598dc;
		border: none;
        outline: none !important;
    }
	.login-form .btn:hover, .login-form .btn:focus {
		background: #2389cd;
	}
	.login-form a {
		color: #fff;
		text-decoration: underline;
	}
	.login-form a:hover {
		text-decoration: none;
	}
	.login-form form a {
		color: #7a7a7a;
		text-decoration: none;
	}
	.login-form form a:hover {
		text-decoration: underline;
	}

</style>
