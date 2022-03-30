import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AdoptableAnimals from '../views/AdoptableAnimals.vue'
import AnimalDetails from '../views/AnimalDetails.vue'
import ShelterInfo from '../views/ShelterInfo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/adoptable-animals',
    name: 'AdoptableAnimals',
    component: AdoptableAnimals
  },
  {
    path: '/adoptable-animals/:id',
    name: 'AnimalDetails',
    component: AnimalDetails
  },
  {
    path: '/shelter-info',
    name: 'ShelterInfo',
    component: ShelterInfo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
