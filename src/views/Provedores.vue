<template>
  <div>
   <h2>Provedores</h2>
  
   <div class="float-right mb-1">
    <b-button class="btn-sm " id="show-btn" variant="primary" @click="showModal">Agregar Proveedor</b-button>
   </div>
    <b-col lg="6" class="my-1">
        <b-form-group
          label="Filtrar"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm" class="mxy-1">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Buscar"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

   <div>
    <b-table  class="mb-2" :items="provedores" head-variant="dark" striped="striped" sticky-header="500px"
      :filter="filter"
      @filtered="onFiltered"
      :fields="fields"
    >
      <template v-slot:cell(Acciones)="row">
        <b-button class="btn-sm mx-2" variant="outline-warning" size="sm" @click="modalEditarProvedor(row.item.id)" >
          Editar
        </b-button>
        <b-button size="sm" @click="eliminarProvedor(row.item.id)" class="btn-danger btn-sm mx-2">
          Eliminar
        </b-button>
      </template>
      
    
    </b-table>
   </div>
   <div>
     
    <b-modal ref="my-modal" hide-footer title="Agregar Provedor">
      <div>
          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba el nombre."
            label="Nombre"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="text" v-model="provedor.nombre"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba el contacto."
            label="Contacto"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="email" v-model="provedor.contacto"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba el telefono."
            label="Telefono"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="number" v-model="provedor.telefono"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba la Direccion."
            label="Direccion"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="text" v-model="provedor.direccion"></b-form-input>
          </b-form-group>

      </div>
      <div class="bottom-modal">
        <b-button class="mt-3" variant="outline-secondary" block @click="hideModal">Cancelar</b-button>
        <b-button class="mt-2" variant="primary" block @click="guardarProvedor(provedor)">Guardar</b-button>
      </div>
    
    </b-modal>

  </div>

  <div>
    <b-modal ref="modalEditar" hide-footer title="Editar Proveedor">
      <div>
          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="edite el nombre."
            label="Nombre"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="text" v-model="provedorEditar.nombre"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Edite el contacto."
            label="Contacto"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="email" v-model="provedorEditar.contacto"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Edite el telefono."
            label="Telefono"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="number" v-model="provedorEditar.telefono"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba la Direccion."
            label="Direccion"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="text" v-model="provedorEditar.direccion"></b-form-input>
          </b-form-group>

      </div>

      <div class="bottom-modal">
        <b-button class="mt-3" variant="outline-secondary" block @click="hideModal">Cancelar</b-button>
        <b-button class="mt-2" variant="primary" block @click="editarProvedor(provedorEditar)">Editar</b-button>
      </div>
    </b-modal>
  </div>

  </div>

</template>

<script>

export default {
  data() {
    return {
      provedores: [],
      provedor: {nombre: '', contacto:'', telefono: null, direccion:'' },
      provedorEditar: {},
      filter: null,
      filterOn: [],
      fields: ['id','nombre', 'telefono','contacto','direccion', 'Acciones'],
    }
  },
  created(){
    this.listarProvedores();
  },
  computed: {
    sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
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
    },
    async eliminarProvedor(id){
      await this.axios.delete(`/proveedor/${id}`)
        .then(async (res) => {
          await this.listarProvedores();
        })
        .catch( e => {
          console.log(e.response);
      })
    },
    guardarProvedor(item) {
      this.axios.post('/proveedor', item)
      .then(res => {
      this.provedores.unshift(res.data);
        this.provedor.nombre ="";
        this.provedor.contacto="";
        this.provedor.telefono="";
        this.provedor.direccion="";
        this.$refs['my-modal'].hide()
      })
    },
    modalEditarProvedor(id){
        console.log("Id a editar", id)
        this.axios.get(`/proveedor/${id}`)
        .then(res => {
          this.provedorEditar = res.data;
          this.$refs['modalEditar'].show()
        })
        .catch( e => {
          console.log(e.response);
        })
    },
    editarProvedor(item) {
      this.axios.put(`/proveedor/${item.id}`, item)
      .then(res => {
        const index = this.provedores.findIndex(p => p.id === res.data.id);
        this.provedores[index].nombre = res.data.nombre;
        this.provedores[index].contacto = res.data.contacto;
        this.provedores[index].telefono = res.data.telefono;
        this.provedores[index].direccion = res.data.direccion;
        this.$refs['modalEditar'].hide();
      })
      .catch(e => {
        console.log(e.response);
      })
    },
    showModal() {
        this.$refs['my-modal'].show()
    },
    hideModal() {
        this.$refs['my-modal'].hide()
    },
  }
}

</script>
