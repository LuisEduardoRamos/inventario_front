<template>
  <div>
   <h2>Categorias</h2>
  
   <div class="float-right mb-1">
    <b-button class="btn-sm " id="show-btn" variant="primary" @click="showModal">Agregar Categoria</b-button>
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
    <b-table  class="mb-2" :items="categorias" head-variant="dark" striped="striped" sticky-header="500px"
      :filter="filter"
      @filtered="onFiltered"
      :fields="fields"
    >
      <template v-slot:cell(Acciones)="row">
        <b-button class="btn-sm mx-2" variant="outline-warning" size="sm" @click="modalEditarCategorias(row.item.id)" >
          Editar
        </b-button>
        <b-button size="sm" @click="eliminarCategoria(row.item.id)" class="btn-danger btn-sm mx-2">
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
            <b-form-input id="input-horizontal" type="text" v-model="categoria.nombre"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba el contacto."
            label="Contacto"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="email" v-model="categoria.restricciones"></b-form-input>
          </b-form-group>

      </div>
      <div class="bottom-modal">
        <b-button class="mt-3" variant="outline-secondary" block @click="hideModal">Cancelar</b-button>
        <b-button class="mt-2" variant="primary" block @click="guardarCategoria(categoria)">Guardar</b-button>
      </div>
    
    </b-modal>

  </div>

  <div>
    <b-modal ref="modalEditar" hide-footer title="Editar Categoria">
      <div>
          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="edite la categoria."
            label="Categoria"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="text" v-model="categoriaEditar.nombre"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Edite la restriccion."
            label="Restricciones"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="email" v-model="categoriaEditar.restricciones"></b-form-input>
          </b-form-group>


      </div>

      <div class="bottom-modal">
        <b-button class="mt-3" variant="outline-secondary" block @click="hideModal">Cancelar</b-button>
        <b-button class="mt-2" variant="primary" block @click="editarCategoria(categoriaEditar)">Editar</b-button>
      </div>
    </b-modal>
  </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      categorias: [],
      categoria: {nombre: '', restricciones:'' },
      categoriaEditar: {},
      filter: null,
      filterOn: [],
      fields: ['id','nombre', 'restricciones', 'Acciones'],
    }
  },
  created(){
    this.listarCategorias();
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
    listarCategorias(){
      this.axios.get('/categoria')
      .then(res => {
        console.log(res.data);
        this.categorias = res.data;
      })
      .catch(e => {
        console.log(e.response);
      })
    },
    async eliminarCategoria(id){
      await this.axios.delete(`/categoria/${id}`)
        .then(async (res) => {
          await this.listarCategorias();
        })
        .catch( e => {
          console.log(e.response);
      })
    },
    guardarCategoria(item) {

      this.axios.post('/categoria', item)
      .then(res => {
        this.categorias.unshift(res.data);
        this.categoria.nombre ="";
        this.categoria.restricciones="";
        this.$refs['my-modal'].hide()
      })
    },
    modalEditarCategorias(id){
        console.log("Id a editar", id)
        this.axios.get(`/categoria/${id}`)
        .then(res => {
          this.categoriaEditar = res.data;
          this.$refs['modalEditar'].show()
        })
        .catch( e => {
          console.log(e.response);
        })
    },
    editarCategoria(item) {
      this.axios.put(`/categoria/${item.id}`, item)
      .then(res => {
        const index = this.categorias.findIndex(p => p.id === res.data.id);
        this.categorias[index].nombre = res.data.nombre;
        this.categorias[index].restricciones = res.data.restricciones;
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
