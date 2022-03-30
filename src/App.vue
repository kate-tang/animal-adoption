<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  components: { Header, Footer },
  setup(){

    return {  }
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
