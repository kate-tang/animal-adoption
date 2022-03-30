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
    component: AdoptableAnimals,
    meta: { title: '動物認養' }
  },
  {
    path: '/adoptable-animals/:id',
    name: 'AnimalDetails',
    component: AnimalDetails,
    meta: { title: '動物資訊' }
  },
  {
    path: '/shelter-info',
    name: 'ShelterInfo',
    component: ShelterInfo,
    meta: { title: '留容量' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from) => {
  const title = '浪我回家'
  if (to.meta.title){
    document.title = `${to.meta.title} | ${title}`
  } else {
    document.title = title
  }
})

export default router
