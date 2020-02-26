<template>
  <div>
    <h2>Productos</h2>
    <div class="float-right">
      <b-button class="btn-sm mb-2" id="show-btn" variant="primary" @click="showModal">Agregar producto</b-button>
    </div>
    <div class="separator"></div>
     <table class="table">
       <thead>
         <tr>
           <th scope="col">Id</th>
           <th scope="col">Nombre</th>
           <th scope="col">Descripción</th>
           <th scope="col">Proveedor</th>
           <th scope="col">Categoría</th>
           <th scope="col">Acciones</th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="(item, index) in productos" :key="index">
           <th scope="row">{{item.id}}</th>
           <td>{{item.nombre}}</td>
           <td>{{item.descripcion}}</td>
           <td>{{item.detallesProveedor.nombre}}</td>
           <td>{{item.detallesCategoria.nombre}}</td>
           <td>
             <b-button class="btn-light btn-sm mx-2" @click="modalEditarProducto(item)">Editar</b-button>
             <b-button class="btn-danger btn-sm mx-2" @click="eliminarProducto(item)">Eliminar</b-button>
           </td>
         </tr>
       </tbody>
     </table>
     <b-modal ref="crear-modal" hide-footer title="Agregar producto">
       <div>
         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Escriba el nombre."
           label="Nombre"
           label-for="input-horizontal"
         >
           <b-form-input id="input-horizontal" type="text" v-model="producto.Nombre"></b-form-input>
         </b-form-group>

         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Escriba la descripción."
           label="Descripción"
           label-for="input-horizontal"
         >
           <b-form-input id="input-horizontal" type="text" v-model="producto.Descripcion"></b-form-input>
         </b-form-group>

         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Elija un proveedor."
           label="Proveedor"
           label-for="input-horizontal"
         >
          <b-form-select v-model="producto.Proveedor" :options="proveedores"></b-form-select>
         </b-form-group>

         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Elija una categoría."
           label="Categoría"
           label-for="input-horizontal"
         >
          <b-form-select v-model="producto.CategoriaProducto" :options="categorias"></b-form-select>
         </b-form-group>

       </div>

       <div class="bottom-modal">
         <b-button class="mt-3" variant="outline-secondary" block @click="hideModal">Cancelar</b-button>
         <b-button class="mt-2" variant="primary" block @click="guardarProducto">Guardar</b-button>
       </div>
     </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [],
      proveedores: [],
      categorias: [],
      producto: {
        Nombre: '',
        Descripcion: '',
        Proveedor: '',
        CategoriaProducto: '',
      },
      isEditing: false,
    }
  },
  created() {
    this.obtenerProductos();
    this.obtenerProveedores();
    this.obtenerCategorias();
  },
  methods: {
    modalEditarProducto(item) {
      this.$refs['crear-modal'].show();
      this.isEditing = true;
      this.producto = {
        ...item,
        Nombre: item.nombre,
        Descripcion: item.descripcion,
        Proveedor: item.detallesProveedor.id,
        CategoriaProducto: item.detallesCategoria.id,
      };
    },
    eliminarProducto(item) {
      this.axios.delete(`/producto/${item.id}`)
        .then(res => {
          this.obtenerProductos();
        })
    },
    showModal() {
      this.$refs['crear-modal'].show();
    },
    obtenerProductos(){
      this.axios.get('/producto')
      .then(res => {
        this.productos = res.data;
      })
      .catch(e => {
        console.error(e.response);
      })
    },
    obtenerProveedores(){
      this.axios.get('/proveedor')
      .then(res => {
        this.proveedores = res.data.map(item => ({ value: item.id, text: item.nombre }));
      })
      .catch(e => {
        console.error(e.response);
      })
    },
    obtenerCategorias(){
      this.axios.get('/categoria')
      .then(res => {
        this.categorias = res.data.map(item => ({ value: item.id, text: item.nombre }));
      })
      .catch(e => {
        console.error(e.response);
      })
    },
    hideModal() {
      this.$refs['crear-modal'].hide();
      this.resetProducto();
    },
    guardarProducto() {
      if (this.isEditing) {
        this.axios.put(`/producto/${this.producto.id}`, {
          ...this.producto,
          nombre: this.producto.Nombre,
          descripcion: this.producto.Descripcion,
          proveedor: this.producto.Proveedor,
          categoriaProducto: this.producto.CategoriaProducto,
        })
          .then(res => {
            this.$refs['crear-modal'].hide();
            this.obtenerProductos();
            this.resetProducto();
          });
      } else {
        this.axios.post('/producto', this.producto)
          .then(res => {
            this.$refs['crear-modal'].hide();
            this.obtenerProductos();
            this.resetProducto();
          });
      }
    },
    resetProducto() {
      this.producto = {
        Nombre: '',
        Descripcion: '',
        Proveedor: '',
        CategoriaProducto: '',
      };
      this.isEditing = false;
    },
  },
}
</script>
