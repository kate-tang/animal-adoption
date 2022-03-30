<template>
  <div class="banner">
    <div class="container">
      <div class="banner-text">
        <h2 class="">{{ bannerTitle }}</h2>
        <nav class="breadcrumb-wrap">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link class="breadcrumb-text" to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item" v-for="item in pathArr" :key="item.path">
              <font-awesome-icon icon="chevron-right" class="arrow" />
              <router-link class="breadcrumb-text" :to="item.path">{{ item.text }}</router-link>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router';

export default {
  props: ['path'],
  setup(){
    const route = useRoute()
    const path = route.path
    const pathDepth = route.path.substring(1).split('/').length
    let pathArr = ref([])
    let bannerTitle = ref('')
    if (pathDepth === 1){
      pathArr.value.push(
        { path, text: '動物認養' }
      )
      bannerTitle.value = '動物認養'
    } else if (pathDepth === 2){
      pathArr.value.push(
        { path: '/adoptable-animals', text: '動物認養' },
        { path, text: '動物資訊' }
      )
      bannerTitle.value = '動物資訊'
    }

    return { path, pathArr, bannerTitle }
  }
}
</script>

<style scoped lang="scss">
.banner {
  position: relative;
  height: 350px;
  background: url('../assets/banner-bg.jpg') no-repeat center / cover;
  background-origin: content-box;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    pointer-events: none;
  }
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .banner-text {
    max-width: 400px;
    margin: 0 auto 20px auto;
    color: #FFF;
    text-align: center;
    font-size: 30px;
  }
  @media (max-width: 1000px) {
    height: 300px;
    .banner-text {
      font-size: 28px;
    }
    .breadcrumb-wrap {
      font-size: 14px;
    }
  }
  @media (max-width: 600px) {
    height: 250px;
    .banner-text {
      font-size: 24px;
    }
  }
}
.breadcrumb-wrap {
  margin-top: 20px;
  font-size: 16px;
}
.breadcrumb {
  display: flex;
  justify-content: center;
}
.breadcrumb-item {
  display: inline;
  line-height: 1.2;
  &:last-child .breadcrumb-text {
    color: #FFF;
    cursor: default;
    pointer-events: none;
  }
}
.breadcrumb-text {
  color: #AAA;
}
a.breadcrumb-text:hover {
  color: #FFF;
}
.arrow {
  margin: 0 10px;
}
</style>