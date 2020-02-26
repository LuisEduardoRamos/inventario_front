<template>
  <b-container>
    <h3>Sucursales</h3>
    <b-row align-h="start">
      <b-col cols="12">
        <b-container>
          <b-form inline class="d-flex justify-content-end" @submit.prevent>
            <div id="div-input">
              <b-input
                id="txtSearch"
                placeholder="Buscar"
                ref="buscar"
                autocomplete="off"
                v-model="buscar"/>
            </div>&nbsp;&nbsp;&nbsp;
            <b-button variant="primary" @click="showModal" style="margin-left: 20px;">AGREGAR</b-button>
          </b-form>
          <br>
          <b-table id="tabla" head-variant="dark" striped="striped" sticky-header="500px"
          :items="items"
          :fields="fields"
          :filter="buscar">
            <template v-slot:cell(Acciones)="row">
              <b-button class="btn-sm mx-2" variant="outline-warning" size="sm" @click="modalEditarSucursal(row.item)" >
                Editar
              </b-button>
              <b-button size="sm" @click="eliminarSucursal(row.item.id)" class="btn-danger btn-sm mx-2">
                Eliminar
              </b-button>
            </template>
          </b-table>
        </b-container>
      </b-col>
    </b-row>
    <b-modal ref="modalAgregar" hide-footer title="Agregar Sucursal">
      <div>
        <b-form-group
        id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Nombre"
            label-for="input-horizontal">
            <b-form-input id="input-horizontal" type="text" v-model="sucursal.nombre"></b-form-input>
        </b-form-group>
        <b-form-group
        id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Dirección"
            label-for="input-horizontal">
            <b-form-input id="input-horizontal" type="text" v-model="sucursal.direccion"></b-form-input>
        </b-form-group>
        <b-form-group
        id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Contacto"
            label-for="input-horizontal">
            <b-form-input id="input-horizontal" type="text" v-model="sucursal.contacto"></b-form-input>
        </b-form-group>
        <b-alert variant="danger" v-show="!validado">Ingrese todos los datos</b-alert>
        <b-button variant="primary" @click="guardarSucursal">GUARDAR</b-button>
      </div>
    </b-modal>
  </b-container>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      buscar:"",
      items: null,
      fields: ['id','nombre', 'direccion','contacto', 'Acciones'],
      sucursal: {
        nombre: null,
        direccion: null,
        contacto: null,
        latitud: '',
        longitud: ''
      },
      validado:false,
      editar: false
    }
  },
  created(){
    this.obtenerSucursales();
  },
  methods: {
    async obtenerSucursales(){
      await this.axios.get('sucursal').then(async(res)=> {
        this.items = await this.parseSucursales(res.data);
      })
    },
    modalEditarSucursal(dato){
      this.sucursal.nombre = dato.nombre;
      this.sucursal.direccion = dato.direccion;
      this.sucursal.contacto = dato.contacto
      this.currentId = dato.id
      //await this.obtenerSucursales();
      //this.validado = false;
      this.editar = true;
      this.$refs['modalAgregar'].show()
    },
    parseSucursales(sucursales){
      return sucursales.map(sucursal => {
        return {
          id: sucursal.id,
          nombre: sucursal.nombre,
          direccion: sucursal.direccion,
          contacto: sucursal.contacto
        }
      })
    },
    async eliminarSucursal(id){
      await this.axios.delete(`/sucursal/${id}`)
        .then(async (res) => {
          await this.obtenerSucursales();
        })
        .catch( e => {
          console.log(e.response);
      })
    },
    guardarSucursal() {
      if(this.sucursal.nombre!==null&& this.sucursal.direccion!==null&&this.sucursal.contacto!==null){
        if(this.editar){
          let aux = {
            id : this.currentId,
            contacto :  this.sucursal.contacto ,
            direccion : this.sucursal.direccion,
            nombre : this.sucursal.nombre
          }
          this.axios.put('/sucursal/'+this.currentId, aux).then(async(res)=>{
            this.sucursal.nombre = null;
            this.sucursal.direccion = null;
            this.sucursal.contacto = null;
            this.currentId = null;
            console.log(res)
            await this.obtenerSucursales();
            this.validado = false;
            this.editar = false
            this.$refs['modalAgregar'].hide()
          })
        }else{
          this.axios.post('/sucursal', this.sucursal).then(async(res)=>{
            this.sucursal.nombre = null;
            this.sucursal.direccion = null;
            this.sucursal.contacto = null
            await this.obtenerSucursales();
            this.validado = false;
            this.$refs['modalAgregar'].hide()
          })
        }
      }else{
        this.validado = true;
      }
    },
    showModal(){
      this.validado = false;
      this.$refs['modalAgregar'].show()
    },
    hideModal(){
      this.validado = false;
      this.$refs['modalAgregar'].hide()
    }
  }
}

</script>
<style>
  .div-input{
    margin-left: 10px;
  }
</style>
