import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import _ from 'lodash';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    provedores:[],
    pedidos: []
  },
  getters: {
    provedores: state => state.provedores,
    pedidos: state => state.pedidos
  },
  mutations: {
    setProvedores(state, data){
      state.provedores = data;
    },
    setPedidos(state,data){
      state.pedidos = data;
    }
  },
  actions: {
    async leerProvedores(context){
      console.log("Leer Provedores")
      let provedoresData = (await Axios.get('159.65.108.144:8000/api/proveedor')).data;
      console.log("Contenido Provedores", provedoresData);
      context.commit("setProvedores",provedoresData);
    },
    async getPedidos(context){
      let aux = [];
      let pedidosData = (await Axios.get('localhost:5000/api/pedidos')).data;
      for(let i = 0;i< pedidosData.lenght;i++){
        aux.push({id: pedidosData[i].id, lat: 0, lon:0})
      }
      console.log("contenido  pedido", aux);
      context.commit("setPedidos", aux);
    },
    updatePedidoLocation(context, id, lat, lon){
      let aux =  context.state.pedidos;
      let pos = _.findIndex(aux,{id: id});
      if(pos >-1){
        aux[pos].lat = lat;
        aux[pos].lon = lon;
      }
      context.commit("setPedidos", aux);

    }
  },
  modules: {
  }
})
