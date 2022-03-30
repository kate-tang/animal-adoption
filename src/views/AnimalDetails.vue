<template>
  <Banner />
  <div class="animal-details main">
    <loading :active="isLoading"></loading>
    <div class="container">
      <div class="loading" v-if="isLoading">
        <p class="title-s text-center">資料載入中...請稍候...</p>
      </div>
      <div class="details" v-if="hasAnimal && !isLoading">
        <div class="album">
          <div class="focus">
            <img :src="animal.image" alt="待領養動物照片" title="待領養動物照片">
          </div>
          <div class="standby">
            <img :src="animal.image" alt="待領養動物照片" title="待領養動物照片">
          </div>
        </div>
        <div class="info">
          <ul class="basic">
            <li>
              <font-awesome-icon icon="paw" class="icon" />動物編號：{{ animal.id }}
            </li>
            <li>
              <font-awesome-icon icon="paw" class="icon" />動物別：{{ animal.kind }}
            </li>
            <li>
              <font-awesome-icon icon="paw" class="icon" />性別：{{ animal.gender }}
            </li>
            <li>
              <font-awesome-icon icon="paw" class="icon" />年齡：{{ animal.age }}
            </li>
            <li>
              <font-awesome-icon icon="paw" class="icon" />體型：{{ animal.size }}
            </li>
            <li>
              <font-awesome-icon icon="paw" class="icon" />尋獲地點：{{ animal.foundplace }}
            </li>
            <li>
              <font-awesome-icon icon="paw" class="icon" />收容所：{{ animal.shelter }}
            </li>
            <li>
              <font-awesome-icon icon="paw" class="icon" />收容所地址：{{ animal.shelter_address }}
            </li>
            <li>
              <font-awesome-icon icon="paw" class="icon" />收容所電話：{{ animal.shelter_tel }}
            </li>
            <li v-if="animal.remark">
              <font-awesome-icon icon="paw" class="icon" />備註：{{ animal.remark }}
            </li>
          </ul>
          <div class="share">
            <a href="#"><font-awesome-icon :icon="['fab', 'facebook-f']" class="icon icon-facebook" /></a>
            <a href="#"><font-awesome-icon :icon="['fab', 'twitter']" class="icon icon-twitter" /></a>
            <a href="#"><font-awesome-icon :icon="['fab', 'line']" class="icon icon-line" /></a>
          </div>
          <button class="btn btn-block">我有意願認養</button>
        </div>
      </div>
      <div class="no-data" v-if="!hasAnimal && !isLoading && moreAnimals.length">
        <p class="title-s text-center">抱歉，您所搜尋的動物不存在或已被領養 <font-awesome-icon :icon="['far', 'frown']" /></p>
        <p class="title-s text-center">要不要看看其他動物呢...</p>
        <div class="cards" @mousedown="handleMousedown" @mouseleave="handleMouseleave" @mouseup="handleMouseup" @mousemove="handleMousemove" ref="cards">
          <Card v-for="n in moreNum" :key="n" :animal-data="moreAnimals[n-1]" :path="path"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import Card from '../components/Card'
import handleApiValue from '../composables/handleApiValue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: { Banner, Card },
  setup(){
    const route = useRoute();
    const path = ref(route.path);
    const animalId = Number(route.params.id);
    const adoptApiUrl = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL';
    let hasAnimal = ref(true);
    let isLoading = ref(false);

    // 抓API資料
    let animal_raw = [];  // 符合網址id的那隻動物
    let animal = ref([]);  // 將上面的資料處理一下
    let moreAnimals_raw = [];  // 若沒有符合網址id的動物，抓出有照片的其他所有動物
    let moreAnimals = ref([]);  // 將上面的資料隨機抓出n筆
    let moreNum = ref(10);  // 隨機抓出的筆數
    
    isLoading.value = true;
    fetch(adoptApiUrl, {method: 'get'})
      .then(res => {
        if (res.ok){
          return res.json();
        } else {
          console.log('fail to connect api');
        }
      })
      .then(data => {
        animal_raw = data.find(item => item.animal_id === animalId);
        if (!animal_raw){
          // 隨機撈出n筆有照片的其他動物
          moreAnimals_raw = data.filter(item => item.album_file);
          let random = Math.floor(Math.random() * (moreAnimals_raw.length - moreNum.value));
          moreAnimals.value = moreAnimals_raw.splice(random, moreNum.value);

          hasAnimal.value = false;
          isLoading.value = false;
          return
        }
        animal.value = handleApiValue(animal_raw);
        isLoading.value = false;
      })
      .catch(err => {
        console.log(err,'connection error');
      })

    // 用滑鼠拖動其他動物區塊
    let cards = ref(null);
    let isDown = false;
    let startX;
    let scrollLeft;
    const handleMousedown = (e) => {
      isDown = true;
      startX = e.pageX - cards.value.getBoundingClientRect().left;
      scrollLeft = cards.value.scrollLeft;
    }
    const handleMouseleave = () => {
      isDown = false;
    }
    const handleMouseup = () => {
      isDown = false;
    }
    const handleMousemove = (e) => {
      if (!isDown){ return }
      e.preventDefault();
      const endX = e.pageX - cards.value.getBoundingClientRect().left;
      const walk = (endX - startX) * 2;
      cards.value.scrollLeft = scrollLeft - walk;
    }

    onMounted(() => {
      document.querySelector('.banner').style.paddingTop = `${document.querySelector('.header').offsetHeight}px`;
    })

    return {
      path, hasAnimal, animal, isLoading, moreAnimals, moreNum,
      handleMousedown, handleMouseleave, handleMouseup, handleMousemove, cards
    }
  }
}
</script>

<style scoped lang="scss">
.animal-details {
  padding: 60px 0 100px;
}
.details {
  display: flex;
  justify-content: space-between;
  .album {
    flex: 0 0 48%;
    padding: 30px 15px;
    background: #EEE;
    .focus {
      img {
        width: 100%;
      }
    }
    .standby {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #AAA;
      img {
        width: 30%;
        & + img {
          margin-left: 20px;
        }
      }
    }
  }
  .info {
    flex: 0 0 48%;
    padding-top: 20px;
    .basic {
      li {
        padding: 8px 0;
        font-size: 18px;
        line-height: 1.5;
        text-indent: -24px;
        .icon {
          margin-right: 5px;
          color: transparent;
        }
        &:hover {
          .icon {
            color: #000;
          }
        }
      }
    }
    .share {
      margin: 20px 0;
      a + a {
        margin-left: 10px;
      }
      .icon {
        width: 25px;
        height: 25px;
        &.icon-facebook { color: #1877F2; }
        &.icon-twitter { color: #1DA1F2; }
        &.icon-line { color: #00C300; }
      }
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    .info .basic li:hover {
      .icon {
        color: transparent;
      }
    }
  }
}
.no-data {
  .cards {
    display: flex;
    margin-top: 50px;
    overflow-x: hidden;
    // user-select: none;
    // cursor: grabbing;
    & > * {
      flex: 0 0 22%;
      @media (max-width: 1000px) {
        flex: 0 0 28%;
      }
      @media (max-width: 850px) {
        flex: 0 0 30%;
      }
      @media (max-width: 768px) {
        flex: 0 0 36%;
      }
    }
    .card {
      margin-bottom: 0;
    }
    .card + .card {
      margin-left: 20px;
    }
  }
}
</style>