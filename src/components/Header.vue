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
      <div class="m-menu-icon" @click="isMobileMenuOpen = !isMobileMenuOpen">
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

    // 瀏覽器寬度>600時，關閉m-menu
    window.addEventListener('resize', (e) => {
      if (window.innerWidth > 600){
        isMobileMenuOpen.value = false;
      }
    });
    // 關閉m-menu
    document.addEventListener('click', e => {
      const mMenu = document.querySelector('.nav')
      const toggle = document.querySelector('.m-menu-icon')
      console.log(!mMenu.contains(e.target), e.target !== toggle, e.target.href);
      
      if (!mMenu.contains(e.target) && e.target !== toggle || e.target.href){
        isMobileMenuOpen.value = false
      }
    })
    
    return { header, nav, isMobileMenuOpen }
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
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
  .site-name {
    font-size: 30px;
    @media (max-width: 768px) {
      font-size: 26px;
    }
    @media (max-width: 500px) {
      font-size: 22px;
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
    pointer-events: none;
    transition: all .3s;
    &::before, &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background: #FFF;
      transform-origin: 0 0;
      transition: all .3s;
    }
    &::before {
      top: -300%;
    }
    &::after {
      bottom: -300%;
    }
  }
}
.m-menu-active {
  .m-menu-icon {
    .bar {
      background: transparent;
      &::before {
        transform: rotate(45deg) translateX(1px);
      }
      &::after {
        transform: rotate(-45deg) translateX(-1px);
      }
    }
  }
}
</style>