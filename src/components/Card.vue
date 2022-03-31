<template>
  <div class="card">
    <div class="card-head">
      <img class="image" :src="animal.image" alt="待領養動物照片" draggable="false">
      <router-link :to="{ name: 'AnimalDetails', params: {id: animal.id} }" class="btn" target="_blank">詳細</router-link>
    </div>
    <div class="card-body" v-if="!path.match(/adoptable-animals\/./)" :class="{ 'show-more': isShowMore }">
      <div class="card-less-info" @click="isShowMore = !isShowMore">
        <div class="location">{{ animal.shelter_county }}</div>
        <div class="controls">
          <font-awesome-icon :icon="isShowMore ? 'chevron-up' : 'chevron-down'" class="arrow" />
        </div>
      </div>
      <div class="card-more-info">
        <div class="info">
          <div class="text">
            <span class="card-info-icon"><font-awesome-icon icon="address-card" title="種類" /></span>
            <span class="card-info-text">{{ animal.kind }}</span>
          </div>
          <div class="text">
            <span class="card-info-icon"><font-awesome-icon icon="tag" title="性別" /></span>
            <span class="card-info-text">{{ animal.gender }}</span>
          </div>
          <div class="text">
            <span class="card-info-icon"><font-awesome-icon icon="bookmark" title="年紀" /></span>
            <span class="card-info-text">{{ animal.age }}</span>
          </div>
          <div class="text">
            <span class="card-info-icon"><font-awesome-icon icon="paw" title="體型" /></span>
            <span class="card-info-text">{{ animal.bodytype }}</span>
          </div>
          <div class="text">
            <span class="card-info-icon"><font-awesome-icon icon="home" title="收容所" /></span>
            <span class="card-info-text">{{ animal.shelter }}</span>
          </div>
        </div>
        <div class="info-btn">
          <router-link :to="{ name: 'AnimalDetails', params: {id: animal.id} }" class="btn" target="_blank">詳細</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import handleApiValue from '../composables/handleApiValue'
import { ref } from 'vue';

export default {
  props: ['animalData', 'path'],
  setup(props){
    const animal = ref(handleApiValue(props.animalData));

    // 手機版面點下三角顯示更多資訊
    let isShowMore = ref(false)

    return { animal, isShowMore }
  }
}
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 30px;
  box-shadow: 5px 10px 8px #EEE;
}
.card-head {
  position: relative;
  .image {
    width: 100%;
    height: 220px;
    object-fit: cover;
  }
  .btn {
    position: absolute;
    top: 50%;
    left: 50%;
    display: none;
    background: rgba(0,0,0,.4);
    transform: translate(-50%, -50%);
    transform-origin: 0% 0%;
    transition: all .3s;
    &:hover {
      background: rgba(0,0,0,.6);
    }
    // 768px以下 不顯示圖片上的"更多"
    @media (max-width: 768px) {
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      padding: 0;
      background: transparent;
      color: transparent;
      transform: none;
      transition: none;
      &:hover {
        background: transparent;
      }
    }
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transition: all .3s;
  }
  &:hover::before {
    background: rgba(0,0,0,.3);
    @media (max-width: 768px) {
      background: transparent;
    }
  }
  &:hover .btn {
    display: block;
    animation: bounce 1s;
    @media (max-width: 768px) {
      animation: none;
    }
  }
  @keyframes bounce {
    0% { transform: scale(1) translate(-50%, -50%); }
    50% { transform: scale(1.1) translate(-50%, -50%); }
    100% { transform: scale(1) translate(-50%, -50%); }
  }
}
.card-body {
  .card-less-info {
    padding: 20px;
    display: none;
    justify-content: space-between;
    transition: all .3s;
    &:active {
      background: rgba(0,0,0,.1);
    }
  }
  .card-more-info {
    display: block;
    margin-top: 20px;
  }
  .info {
    padding-right: 20px;
  }
  .text {
    padding-left: 50px;
    text-indent: -20px;
    .card-info-icon {
      display: inline-block;
      width: 20px;
      text-align: center;
    }
  }
  .info-btn {
    padding: 20px 0;
    text-align: center;
  }
  @media (max-width: 600px) {
    .card-less-info {
      display: flex;
    }
    .card-more-info {
      display: none;
    }
    &.show-more .card-more-info {
      display: block;
      margin-top: 0;
    }
  }
}
</style>