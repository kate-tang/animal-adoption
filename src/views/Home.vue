<template>
  <div class="home main">
    <div class="banner">
      <div class="container">
        <div class="banner-text">
          <h2 class="title-l">愛牠，<br>就不要拋棄牠</h2>
          <router-link to="/adoptable-animals" class="btn">我要認養</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: 'Home',
  setup(){
    onMounted(() => {
      document.querySelector('.main').style.paddingTop = `${document.querySelector('.header').offsetHeight}px`;
    })
  }
}
</script>

<style lang="scss" scoped>
.home {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    @media (max-width: 600px) {
      justify-content: flex-start;
    }
  }
}
.banner {
  height: 95vh;
  background: url('../assets/home-bg.jpeg') no-repeat 50% 50% / cover;
  @media (max-width: 600px) {
    background-position: 75% center;
  }
}
.banner-text {
  margin-left: 10%;
  @media (max-width: 600px) {
    margin-top: 100px;
  }
}
</style>