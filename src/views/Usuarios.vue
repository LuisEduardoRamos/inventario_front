<template>
  <div>
   <h2>Usuarios</h2>
  
   <div class="float-right mb-1">
    <b-button class="btn-sm " id="show-btn" variant="primary" @click="showModal">Agregar Usuario</b-button>
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
    <b-table  class="mb-2" :items="usuarios" head-variant="dark" striped="striped" sticky-header="500px"
      :filter="filter"
      :fields="fields"
    >
      <template v-slot:cell(Acciones)="row">
        <b-button class="btn-sm mx-2" variant="outline-warning" size="sm" @click="modalEditarUsuario(row.item.id)" >
          Editar
        </b-button>
        <b-button size="sm" @click="eliminarUsuario(row.item.id)" class="btn-danger btn-sm mx-2">
          Eliminar
        </b-button>
      </template>
       
    </b-table>
   </div>
   <div>
     
    <b-modal ref="my-modal" hide-footer title="Agregar Usuario">
      <div>
          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba el nombre."
            label="Nombre"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="text" v-model="usuario.nombre"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba el correo."
            label="Correo"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="email" v-model="usuario.correo"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba el Nombre de usuario."
            label="Nombre de Usuario"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="text" v-model="usuario.nombreUsuario"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba la Contraseña."
            label="Contraseña"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="password" v-model="usuario.password"></b-form-input>
          </b-form-group>

           <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba la Telefono."
            label="Telefono"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="number" v-model="usuario.telefono"></b-form-input>
          </b-form-group>

          <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Elija una sucursal."
           label="Sucursal"
           label-for="input-horizontal"
         >
          <b-form-select v-model="usuario.sucursal" :options="sucursales"></b-form-select>
         </b-form-group>

      </div>
      <div class="bottom-modal">
        <b-button class="mt-3" variant="outline-secondary" block @click="hideModal">Cancelar</b-button>
        <b-button class="mt-2" variant="primary" block @click="guardarUsuario(usuario)">Guardar</b-button>
      </div>
    
    </b-modal>

  </div>

  <div>
    <b-modal ref="modalEditar" hide-footer title="Editar Usuario">
      <div>
          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="edite el nombre."
            label="Nombre"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="text" v-model="usuarioEditar.nombre"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Edite el contacto."
            label="Contacto"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="email" v-model="usuarioEditar.correo"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Edite el telefono."
            label="Telefono"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="text" v-model="usuarioEditar.telefono"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Nombre de usuario."
            label="Usuario"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="text" v-model="usuarioEditar.nombreUsuario"></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            description="Escriba la Contraseña."
            label="Contraseña"
            label-for="input-horizontal"
          >
            <b-form-input id="input-horizontal" type="password" v-model="usuarioEditar.password"></b-form-input>
          </b-form-group>

          <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Elija una sucursal."
           label="Sucursal"
           label-for="input-horizontal"
         >
          <b-form-select v-model="usuarioEditar.sucursalEditar" :options="sucursales"></b-form-select>
         </b-form-group>

      </div>

      <div class="bottom-modal">
        <b-button class="mt-3" variant="outline-secondary" block @click="hideModal">Cancelar</b-button>
        <b-button class="mt-2" variant="primary" block @click="editarUsuario(usuarioEditar)">Editar</b-button>
      </div>
    </b-modal>
  </div>

  </div>

</template>

<script>

export default {
  data() {
    return {
      usuarios: [],
      usuario: {nombre: '', correo:'', nombreUsuario: '', password:'', sucursal:'' },
      usuarioEditar:{},
      sucursales:[],
      filter: "",
      filterOn: [],
      fields: ['id','nombre', 'correo','nombreUsuario','sucursal.id','sucursal.nombre', 'Acciones'],
    }
  },
  created(){
    this.listarUsuarios();
    this.listarSucursales();
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

    listarUsuarios(){
      this.axios.get('/usuario')
      .then(res => {
        this.usuarios = res.data;
      })
      .catch(e => {
        console.log(e.response);
      })
    },
    async listarSucursales(){
       await this.axios.get('/sucursal')
      .then(async(res) => {
        this.sucursales = await res.data.map(item => ({ value: item.id, text: item.nombre }));
      })
      .catch(e => {
        console.log(e.response);
      })
      },
     eliminarUsuario(id){
       this.axios.delete(`/usuario/${id}`)
        .then(async (res) => {
           this.listarUsuarios();
        })
        .catch( e => {
          console.log(e.response);
      })
    },
    guardarUsuario(item) {

      this.axios.post('/usuario', item)
      .then(res => {
        this.usuarios.unshift(res.data);
        this.usuario.nombre ="";
        this.usuario.correo="";
        this.usuario.nombreUsuario="";
        this.usuario.password="";
        this.socursal=""
        this.$refs['my-modal'].hide()
      })
      this.listarUsuarios()
    },
    async modalEditarUsuario(item){

        console.log("Sucursales editar",this.sucursales)

        this.axios.get(`/usuario/${item}`)
        .then(async(res) => {
          this.usuarioEditar = res.data;
          this.$refs['modalEditar'].show()
        })
        .catch( e => {
          console.log(e.response);
        })
    },
    items(item){
    },
     async editarUsuario(item) {
      console.log(item.sucursalEditar);
      let usuario ={
        id : item.id,
        nombre : item.nombre,
        correo : item.correo,
        telefono : item.telefono,
        nombreUsuario : item.nombreUsuario,
        password : item.password,
        sucursal : item.sucursalEditar
      }

      await this.axios.put(`/usuario/${usuario.id}`, usuario)
      .then(async(res) => {
        console.log(res)
        this.$refs['modalEditar'].hide();

      })
      .catch(e => {
        console.log(e.response);
      })
      await this.listarUsuarios();
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
