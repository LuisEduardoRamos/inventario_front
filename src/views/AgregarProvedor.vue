<template>
  <div>
   <h2>Provedores</h2>
        <div class="table-section">
          <b-table striped hover :items="provedores">sdhfjhaf</b-table>
          <b-button variant="primary">Agregar<router-link to="agregarProvedor"></router-link></b-button>
        </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      provedores: []
    }
  },
  created(){
    this.listarProvedores();
  },
  methods:{
    listarProvedores(){
      this.axios.get('/proveedor')
      .then(res => {
        console.log(res.data);
        this.provedores = res.data;
      })
      .catch(e => {
        console.log(e.response);
      })
    }
  }
}

</script>

