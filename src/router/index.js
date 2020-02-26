import Vue from 'vue'
import VueRouter from 'vue-router'
import Provedores from '../views/Provedores.vue'
import Pedidos from '../views/Pedidos.vue'
import Productos from '../views/Productos.vue'
import Ordenar from '../views/Ordenar.vue'
import Reportes from '../views/Reportes.vue'
import AgregarProvedor from '../views/AgregarProvedor.vue'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Sucursales from '../views/Sucursales.vue';
import Categoria from '../views/Categoria.vue'
import DetallePedido from '../views/DetallePedido.vue'
import Sinpermisos from '../views/Sinpermisos.vue'
import Usuarios from '../views/Usuarios.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/login',
    component: Login,
    beforeEnter: (to, from, next) => { 
      delete localStorage.token;
      next();  
  } 
  },
  {
    path: '/sinpermisos',
    name: 'sinpermisos',
    component: Sinpermisos
  },
  {
    path: '/application',
    component: Main,
    children: [
      {
        path: '/provedores',
        name: 'provedores',
        component: Provedores
      },
      {
        path: '/categoria',
        name: 'categoria',
        component: Categoria
      },
      {
        path: '/agregarProvedor',
        name: 'agregarProvedor',
        component: AgregarProvedor
      },
      {
        path: '/pedidos',
        name: 'pedidos',
        component: Pedidos
      },
      {
        path: '/productos',
        name: 'productos',
        component: Productos
      },
      {
        path: '/ordenar',
        name: 'ordenar',
        component: Ordenar
      },
      {
        path: '/inventario',
        name: 'reportes',
        component: Reportes
      },
      {
        path: '/sucursales',
        name: 'sucursales',
        component: Sucursales
      },
      {
        path: '/detalle-pedido/:id',
        name: 'detallePedido',
        component: DetallePedido
      },
      {
        path: '/usuarios',
        name: 'usuarios',
        component: Usuarios
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
