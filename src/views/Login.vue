<template>
  <div class="container-fluid bg">
    <section class="row justify-content-center">
      <section class="center-all">
        <form class="form-container">
          <div class="center-horizontal">
            <img src="Logo.png" class="logo" />
          </div>
          <div class="form-group">
            <label for="emailInput">Correo Electronico</label>
            <input type="email" class="form-control" id="emailImput" aria-describedby="emailHelp" placeholder="Introduzca el correo" v-model="usuarioSesion">
          </div>
          <div class="form-group">
            <label for="inputPassword">Contraseña</label>
            <input type="password" class="form-control" id="inputPassword" placeholder="Contraseña" v-model="password">
          </div>
          <div>
            <label for="">¿Necesitas Ayuda?</label>
          </div>
          <button type="submit" class="btn btn-primary btn-block" @click="iniciarSesion">Entrar</button>
        </form>

      </section>
    </section>
  </div>
</template>

<script>

import router from 'vue-router'

export default {
  data(){
    return {
      usuarioSesion:'',
      password:''
    }
  },
  created: function (){

    let datos = JSON.parse(localStorage.getItem('ses'));
    localStorage.removeItem('ses')
    if(datos === null){
      this.usuario = [];
    }else{
      this.usuario = datos;
    }

  },
  methods: {
    iniciarSesion(){

      let usuario = new Object();
      usuario.usuario = this.usuarioSesion;
      usuario.password = this.password

      console.log("objeto: ", usuario)

      this.axios.post('/usuario/login', usuario)
        .then(res => {
          if(this.usuarioSesion === res.data.nombreUsuario){
            if(this.password === res.data.password){
              localStorage.setItem('ses', JSON.stringify(usuario));
              this.$router.push('application')
            }
          }else{
              console.log("Usuario Invalido")
          }
      })
      .catch( e => {
          console.log(e.response);
          console.log("Ho rayos")
      })

    },
  },
}
</script>

<style>

.bg{

  width: 100%;
  height: 100vh;
  background-size: 100%;
}

.center-all {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
}

.form-container{
  background: #fff;
  padding: 24px 32px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 10px 0px #000;
  box-shadow: 0px 0px 10px 0px #0000002e;
  width: 360px;
}

.center-horizontal {
  width: 120px;
  margin: 0 auto;
}

.logo {
  width: 120px;
  margin-bottom: 24px;
}

</style>
