<template>
  <b-container>
    <h3>Inventario</h3>
    <b-row align-h="start" ref="pagina">
      <b-col cols="12">
        <b-container>
          <b-form inline class="d-flex justify-content-start" @submit.prevent>
            <b-input
              id="txtSearch"
              placeholder="Filtrar"
              ref="filtrar"
              autocomplete="off"
              v-model="filtrar"
              />
          </b-form>  
        </b-container>
      </b-col>
    </b-row>
    <b-row>
      <b-table style="margin-top:20px;" class="mb-2"  head-variant="dark" striped="striped" sticky-header="500px"
        :items="items"
        :fields="fields"
        :filter="filtrar"/>
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      items: null,
      filtrar:"",
      fields: [
          {
            key: 'id',
            sortable: true
          },
          {
            key: 'producto',
            sortable: true
          },
          {
            key: 'proveedor',
            sortable: true
          },
          {
            key: 'categoria',
            sortable: true
          },
          {
            key: 'sucursal',
            sortable: true
          },
          {
            key: 'ingreso',
            sortable: true
          },
          {
            key: 'lote',
            sortable: true
          },
          {
            key: 'existencia',
            sortable: true
          }
      ]
    }
  },
  created(){
    this.obtenerInventario();
  },
  methods: {
    async obtenerInventario(){
      await this.axios.get('/inventario/inventarioDetallado').then(async (res)=>{
        this.items = await this.parseInventario(res.data)
        console.log(this.items);
      })
    },
    async parseInventario(pedidos){
      return pedidos.map(pedido => {
        return{id : pedido.id,
        producto : pedido.producto.nombre,
        proveedor : pedido.producto.detallesProveedor.nombre,
        categoria : pedido.producto.detallesCategoria.nombre,
        sucursal : pedido.sucursal.nombre,
        ingreso : pedido.fechaIngreso,
        lote : pedido.lote.fechaMaxima,
        existencia : pedido.cantidad}
      });
    }
  }
}

</script>
