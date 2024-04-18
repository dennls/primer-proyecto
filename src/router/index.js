import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '@/views/ContactView.vue'
import rickandmorthy from '@/views/rickandmorthy.vue'
import product from '@/views/product.vue'
import formulario from '@/views/formulario.vue'
import carrito from '@/views/carrito.vue'
import ventas from '@/views/ventas.vue'
import layoutApp from '@/layout/layoutApp.vue'
import loginpage from '@/views/Auth/loginpage.vue'
import ProveedoresComponent from "../views/Proveedores.vue";
import FormularioProveedorComponent from "../views/FormularioProveedor.vue";
import perfilView from '@/views/perfilView.vue'

const routes = [

  {
    path: '/login',
    component: loginpage,
  },  
  {
    path: '/',
    component: layoutApp,
    children: [
      {
        path: "/home",
        name: "home",
        component: HomeView,
      },
      
      {
        path: '/contactos',
        name: 'contacto',
        component: ContactView
      },
      {
        path: '/rickandmorthy',
        component: rickandmorthy
      },
      {
        path: '/product',
        name: product,
        component: product
      },
      {
        path: '/formulario/:idProd?',
        name: formulario,
        component: formulario
      },
      {
        path: '/carrito',
        name: carrito,
        component: carrito
      },
      {
        path: '/ventas',
        name: ventas,
        component: ventas
      },  
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: '/perfil',
        name: 'perfil',
        component: perfilView
      },
      {
        path: "/proveedores",
        component: ProveedoresComponent,
      },
      {
        path: "/proveedor-formulario/:idProveedor?",
        component: FormularioProveedorComponent
      }

    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;