<template>
  <div>
    <h2>Ordenes</h2>
    <div class="float-right">
      <b-button class="btn-sm mb-2" id="show-btn" variant="primary" @click="showModal">Agregar orden</b-button>
    </div>
     <table class="table">
       <thead>
         <tr>
           <th scope="col">Id</th>
           <th scope="col">Sucursal</th>
           <th scope="col">Fecha creación</th>
           <th scope="col">Fecha entrega</th>
           <th scope="col">Dirección</th>
           <th scope="col">Estado</th>
           <th scope="col">Acciones</th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="(item, index) in ordenes" :key="index">
           <th scope="row">{{item.id}}</th>
           <td>{{item.nombreSucursal}}</td>
           <td>{{item.fechaCreacion}}</td>
           <td>{{item.fechaEntrega}}</td>
           <td>{{item.direccion}}</td>
           <td>{{item.estado}}</td>
           <td>
             <!-- <b-button class="btn-light btn-sm mx-2" @click="modalEditarOrden(item)">Editar</b-button> -->
             <b-button class="btn-danger btn-sm mx-2" @click="eliminarOrden(item)">Eliminar</b-button>
           </td>
         </tr>
       </tbody>
     </table>
     <b-modal ref="crear-modal" hide-footer title="Nueva orden">
       <!-- <div>
         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Escriba el nombre."
           label="Nombre"
           label-for="input-horizontal"
         >
           <b-form-input type="text" v-model="orden.Nombre"></b-form-input>
         </b-form-group>

         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Escriba la descripción."
           label="Descripción"
           label-for="input-horizontal"
         >
           <b-form-input type="text" v-model="orden.Descripcion"></b-form-input>
         </b-form-group>

         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Elija un proveedor."
           label="Proveedor"
           label-for="input-horizontal"
         >
          <b-form-select v-model="orden.Proveedor" :options="proveedores"></b-form-select>
         </b-form-group>

         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Elija una categoría."
           label="Categoría"
           label-for="input-horizontal"
         >
          <b-form-select v-model="orden.CategoriaOrden" :options="categorias"></b-form-select>
         </b-form-group>

       </div> -->
       <div>
         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Elija la sucursal."
           label="Sucursal"
           label-for="input-horizontal"
         >
          <b-form-select v-model="orden.idSucursal" :options="sucursales"></b-form-select>
         </b-form-group>
         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Elija fecha de entrega."
           label="Fecha de entrega"
           label-for="input-horizontal"
         >
           <b-form-input type="date" v-model="orden.FechaEntrega"></b-form-input>
         </b-form-group>
         <div class="space-between">
           <h6>Productos</h6>
           <b-button class="btn-sm" id="show-btn" variant="primary" @click="nuevoProducto">Nuevo</b-button>
         </div>
         <div
          style="margin: 16px 0;"
          class="space-between"
          v-for="(item, index) in toAddProducts"
          :key="index"
          >
           <b-form-select placeholder="Producto" v-model="item.idProducto" :options="productos"></b-form-select>
           <b-form-input placeholder="Cantidad" style="margin: 0 60px;" type="number" v-model="item.Cantidad"></b-form-input>
           <b-button class="btn-sm" variant="primary" @click="eliminarProducto(index)">X</b-button>
         </div>
       </div>
       <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancelar</b-button>
       <b-button class="mt-2" variant="outline-success" block @click="guardarOrden">Guardar</b-button>
     </b-modal>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      ordenes: [],
      productos: [],
      sucursales: [],
      orden: {
        idSucursal: '',
        FechaCreacion: new Date(),
        FechaEntrega: '',
        productos: [],
      },
      toAddProducts: [
        {
          idProducto: '',
          Cantidad: '',
        }
      ],
    }
  },
  created() {
    this.obtenerOrdenes();
    this.obtenerProductos();
    this.obtenerSucursales();
  },
  methods: {
    eliminarOrden(item) {
      this.axios.delete(`/pedido/${item.id}`)
        .then(res => {
          this.obtenerOrdenes();
        })
    },
    showModal() {
      this.$refs['crear-modal'].show();
    },
    obtenerOrdenes(){
      this.axios.get('/pedido')
      .then(res => {
        this.ordenes = res.data;
      })
      .catch(e => {
        console.error(e.response);
      })
    },
    obtenerProductos(){
      this.axios.get('/producto')
      .then(res => {
        this.productos = res.data.map(item => ({ value: item.id, text: item.nombre }));
      })
      .catch(e => {
        console.error(e.response);
      })
    },
    obtenerSucursales(){
      this.axios.get('/sucursal')
      .then(res => {
        this.sucursales = res.data.map(item => ({ value: item.id, text: item.nombre }));
      })
      .catch(e => {
        console.error(e.response);
      })
    },
    hideModal() {
      this.$refs['crear-modal'].hide();
      this.resetOrden();
    },
    guardarOrden() {
      this.axios.post('/pedido', {
        idSucursal: this.orden.idSucursal,
      	FechaCreacion: moment().format('DD-MM-YYYY'),
      	FechaEntrega: moment(this.orden.FechaEntrega).format('DD-MM-YYYY'),
      	productos: this.toAddProducts.map(item => ({ ...item, Cantidad: Number(item.Cantidad) })),
      })
        .then(res => {
          this.$refs['crear-modal'].hide();
          this.obtenerOrdenes();
          this.resetOrden();
        })
        .catch(res => {
          this.$refs['crear-modal'].hide();
          this.obtenerOrdenes();
          this.resetOrden();
        });
    },
    resetOrden() {
      this.orden = {
        idSucursal: '',
        FechaCreacion: '',
        FechaEntrega: '',
        productos: [],
      };
      this.toAddProducts = [];
    },
    nuevoProducto() {
      this.toAddProducts.push({
        idProducto: '',
        Cantidad: '',
      });
    },
    eliminarProducto(index) {
      this.toAddProducts.splice(index, 1);
    },
  },
}
</script>
<style scoped>
  .space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
