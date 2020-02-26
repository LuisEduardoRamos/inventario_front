import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import store from './store';
import { mapActions } from 'vuex';
import Vue from 'vue';
const inventarioHub = new Vue() 

const connection = new HubConnectionBuilder()
  .withUrl('http://localhost:5000/inventarioHub')
  .configureLogging(LogLevel.Information)
  .build()
 
Vue.prototype.$inventarioHub = inventarioHub;

connection.start();
 connection.on('SendPosition',(idPedido, coordenadas) => {
     inventarioHub.$emit('updatePos', ({idPedido, coordenadas}));
 })