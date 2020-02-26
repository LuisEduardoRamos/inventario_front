<template>
  <div>
    <h1>Detalle de pedido</h1>
    <h5>Fecha de entrega</h5>
    <div class="info">{{pedidoSeleccionado.pedidoDetalles.fechaEntrega || new Date()}}</div>
    <h5>Origen</h5>
    <div class="info">{{pedidoSeleccionado.pedidoDetalles.sucursalOrigen.nombre}}</div>
    <div
      class="info"
    >{{`${pedidoSeleccionado.pedidoDetalles.sucursalOrigen.contacto} - ${pedidoSeleccionado.pedidoDetalles.sucursalOrigen.direccion}`}}</div>
    <h5>Destino</h5>
    <div class="info">{{pedidoSeleccionado.pedidoDetalles.sucursalDestino.nombre}}</div>
    <div
      class="info"
    >{{`${pedidoSeleccionado.pedidoDetalles.sucursalDestino.contacto} - ${pedidoSeleccionado.pedidoDetalles.sucursalDestino.direccion}`}}</div>
    <h5>Pedidos</h5>
    <ul>
      <li
        class="info"
        v-for="item in pedidoSeleccionado.productos"
        :key="item.id"
      >{{`${item.nombreProducto}(${item.cantidad})`}}</li>
    </ul>
    <h4>Latitud: {{`${this.posicion.lat}`}}</h4>
    <h4>Longitud: {{ `${this.posicion.lng}`}}</h4>
    <GmapMap :center="posicion" :zoom="7" map-type-id="terrain" style="width: 100%; height: 300px">
      <GmapMarker
        :position="posicion"
        :clickable="true"
        :draggable="true"
        @click="center=posicion"
      />
    </GmapMap>
  </div>
</template>

<script>
import moment from "moment";
import {gmapApi} from 'vue2-google-maps';
export default {
  data() {
    return {
      pedidoSeleccionado: {
        pedidoDetalles: {
          sucursalDestino: {
            nombre: "",
            contacto: "",
            direccion: ""
          },
          sucursalOrigen: {
            nombre: "",
            contacto: "",
            direccion: ""
          }
        },
        productos: {},
        posicion2: {lat: 10, lng:10},
        google: gmapApi,
        vacio: "0"
      },
      posicion: { lat: 10, lng: 10 },

    };
  },

  created() {
    this.$inventarioHub.$on("updatePos", ({ idPedido, coordenadas }) => {
      this.updateLocation(idPedido, coordenadas);
    });
    this.mostrarDetalle();
  },
  methods: {
    mostrarDetalle(item) {
      console.log("this.$route", this.$route);
      this.axios
        .get(`/pedido/detalles/${this.$route.params.id}`)
        .then(res => {
          console.log("res.data", res.data);
          this.pedidoSeleccionado = res.data;
        })
        .catch(e => {
          console.error(e.response);
        });
    },
    updateLocation(id, coordenadas) {
      console.log(id);
      if (this.$route.params.id == id) {
        console.log(coordenadas);
        this.posicion = {lat: parseFloat(coordenadas.latitud), lng: parseFloat(coordenadas.longitud)};
      }
      console.log(this.posicion.lat)
    }
  }
};
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
