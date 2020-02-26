import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//BootstrapVue
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


//HUB
import './inventarioHub';

//URLBASE
axios.defaults.baseURL = 'http://159.65.108.144:8000/api';
//axios.defaults.baseURL = 'http://localhost:5000/api';

//MAPS
import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBPKur1-Zt0bmpNv95mMGctkj74_YkziQU',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  }})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  BootstrapVue,
  render: h => h(App)
}).$mount('#app')
