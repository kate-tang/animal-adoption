<template>
  <Header ref="header" />
  <router-view ref="main"/>
  <Footer />
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import { onMounted, ref } from 'vue'

export default {
  components: { Header, Footer },
  setup(){
    const header = ref(null);
    const main = ref(null);

    return { main, header }
  }
}
</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
}
.main {
  padding-top: 100px;
}
</style>
