<template>
  <div>
    <h2>Pedidos</h2>
    <div class="float-right">
      <b-button class="btn-sm mb-2" id="show-btn" variant="primary" @click="showModal">Agregar pedido</b-button>
    </div>
    <div class="separator"></div>
     <table class="table">
       <thead>
         <tr>
           <th scope="col">Id</th>
           <th scope="col">Sucursal origen</th>
           <th scope="col">Sucursal destino</th>
           <th scope="col">Fecha creación</th>
           <th scope="col">Fecha entrega</th>
           <th scope="col">Estado</th>
           <th scope="col">Acciones</th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="(item, index) in ordenes" :key="index">
           <th scope="row">{{item.id}}</th>
           <td>{{`${item.sucursalOrigen.nombre} (${item.sucursalOrigen.direccion})`}}</td>
           <td>{{`${item.sucursalDestino.nombre} (${item.sucursalDestino.direccion})`}}</td>
           <td>{{item.fechaCreacion}}</td>
           <td>{{item.fechaEntrega}}</td>
           <td>{{item.estado}}</td>
           <td>
             <b-button class="btn-light btn-sm mx-2" @click="mostrarDetalle(item)">Detalle</b-button>
             <b-button class="btn-danger btn-sm mx-2" @click="eliminarOrden(item)">Eliminar</b-button>
           </td>
         </tr>
       </tbody>
     </table>
     <b-modal ref="crear-modal" hide-footer title="Nuevo pedido">
       <div>
         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Elija la sucursal origen."
           label="Sucursal origen"
           label-for="input-horizontal"
         >
          <b-form-select v-model="orden.idSucursalOrigen" :options="sucursales"></b-form-select>
         </b-form-group>
         <b-form-group
           id="fieldset-horizontal"
           label-cols-sm="4"
           label-cols-lg="3"
           description="Elija la sucursal destino."
           label="Sucursal destino"
           label-for="input-horizontal"
         >
          <b-form-select v-model="orden.idSucursalDestino" :options="sucursales"></b-form-select>
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
           <h5>Productos</h5>
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
       <div class="bottom-modal">
         <b-button class="mt-3" variant="outline-secondary" block @click="hideModal">Cancelar</b-button>
         <b-button class="mt-2" variant="primary" block @click="guardarOrden">Guardar</b-button>
       </div>
     </b-modal>
     <b-modal ref="detalle-pedido" hide-footer title="Detalle pedido">
       <h5>Fecha de entrega</h5>
       <div class="info">{{pedidoSeleccionado.pedidoDetalles.fechaEntrega || new Date()}}</div>
       <h5>Origen</h5>
       <div class="info">{{pedidoSeleccionado.pedidoDetalles.sucursalOrigen.nombre}}</div>
       <div class="info">{{`${pedidoSeleccionado.pedidoDetalles.sucursalOrigen.contacto} - ${pedidoSeleccionado.pedidoDetalles.sucursalOrigen.direccion}`}}</div>
       <h5>Destino</h5>
       <div class="info">{{pedidoSeleccionado.pedidoDetalles.sucursalDestino.nombre}}</div>
       <div class="info">{{`${pedidoSeleccionado.pedidoDetalles.sucursalDestino.contacto} - ${pedidoSeleccionado.pedidoDetalles.sucursalDestino.direccion}`}}</div>
       <h5>Pedidos</h5>
       <ul>
         <li class="info" v-for="item in pedidoSeleccionado.productos" :key="item.id">
           {{`${item.nombreProducto}(${item.cantidad})`}}
         </li>
       </ul>
     </b-modal>
  </div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
export default {
  data() {
    return {
      ordenes: [],
      ordenesLocation: [],
      productos: [],
      sucursales: [],
      orden: {
        idSucursalOrigen: '',
        idSucursalDestino: '',
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
      pedidoSeleccionado: {
        pedidoDetalles: {
          sucursalDestino: {
            nombre: '',
            contacto: '',
            direccion: '',
          },
          sucursalOrigen: {
            nombre: '',
            contacto: '',
            direccion: '',
          },
        },
        productos: {},
      },
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
        let aux =[];
        for(let i=0; i< res.data.length; i++){
          aux.push({
            id: res.data[i].id,
            lat: "0",
            lon: "0"
          })
        }
        console.log(aux);
        this.ordenesLocation= aux;
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
        idSucursalOrigen: this.orden.idSucursalOrigen,
        idSucursalDestino: this.orden.idSucursalDestino,
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
    mostrarDetalle(item) {
      this.$router.replace(`/detalle-pedido/${item.id}`);
      // this.$refs['detalle-pedido'].show();
      // this.axios.get(`/pedido/detalles/${item.id}`)
      //   .then(res => {
      //     console.log('res.data', res.data);
      //     this.pedidoSeleccionado = res.data;
      //   })
      //   .catch(e => {
      //     console.error(e.response);
      //   })
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
  h5 {
    margin: 16px 0;
  }
  .info {
    padding-left: 8px;
  }
</style>
