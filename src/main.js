import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './scss/style.scss'

import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { fas, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, fab, far);
export { FontAwesomeIcon };
const chevron = [icon(faChevronLeft), icon(faChevronRight)];

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('Loading', Loading)
  .provide('chevron', chevron)
  .mount('#app')