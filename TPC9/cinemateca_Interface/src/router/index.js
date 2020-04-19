import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FilmeIndividual from '../views/FilmeIndividual.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { 
    path: '/:idFilme',
    name: 'FilmeIndividual',
    component: FilmeIndividual, 
    props: true 
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router