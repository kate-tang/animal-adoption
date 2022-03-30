<template>
  <header class="header" ref="header" :class="{'m-menu-active' : isMobileMenuOpen}">
    <div class="container">
      <div class="site-icon">
        <h1 class="site-name">
          <router-link to="/">
            <font-awesome-icon icon="paw" />
            浪我回家
            <font-awesome-icon icon="paw" />
          </router-link>
        </h1>
      </div>
      <div class="m-menu-icon" @click="switchMenu">
        <div class="bar"></div>
      </div>
      <nav class="nav" ref="nav">
        <ul class="menu">
          <li>
            <router-link to="/adoptable-animals">動物認養</router-link>
          </li>
          <li>
            <router-link to="/shelter-info">留容量</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(){
    let header = ref(null);
    let nav = ref(null);
    let isMobileMenuOpen = ref(false);
    let isLoadFinish = ref(false);

    // 瀏覽器寬度>600時，關閉m-menu
    window.addEventListener('resize', (e) => {
      if (window.innerWidth > 600){
        isMobileMenuOpen.value = false;
      }
    });
    // 點漢堡，toggle顯示m-menu
    let switchMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    }
    
    return { header, nav, isMobileMenuOpen, switchMenu }
  }
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  width: 100%;
  background: $primary-color;
  color: #FFF;
  z-index: 3;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $primary-color;
    @media (max-width: 600px) {
      padding: 15px 30px;
    }
  }
  .site-name {
    font-size: 30px;
    @media (max-width: 600px) {
      font-size: 26px;
    }
    @media (max-width: 414px) {
      font-size: 24px;
    }
  }
  .nav {
    @media (max-width: 600px) {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      width: 100%;
      overflow: hidden;
      background: $primary-color;
      transform: translateY(-100%);
      transition: all .5s;
      z-index: -1;
    }
  }
  &.m-menu-active .nav {
    transform: translateY(0);
  }
  .menu {
    display: flex;
    @media (max-width: 600px) {
      flex-direction: column;
    }
    a {
      display: block;
      padding: 20px;
    }
  }
  a {
    font-weight: bold;
    color: #FFF;
  }
}
.m-menu-icon {
  display: none;
  align-items: center;
  width: 27px;
  height: 25px;
  cursor: pointer;
  @media (max-width: 600px) {
    display: flex;
  }
  .bar {
    position: relative;
    width: 100%;
    height: 3px;
    background: #FFF;
    &::before, &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background: #FFF;
    }
    &::before {
      top: -300%;
    }
    &::after {
      bottom: -300%;
    }
  }
}
</style>