<template>
  <div class="shelter main">
    <loading :active="isLoading"></loading>
    <div class="light">
      <div class="container">
        <div class="light-intro">
          <h2 class="light-title title-l">各縣市收容所<br class="br">留容量警示燈號系統</h2>
          <ul class="light-demo" v-if="!isLoading">
            <li class="green">
              <div class="circle"></div>
              <p class="text">正常</p>
            </li>
            <li class="yellow">
              <div class="circle"></div>
              <p class="text">偏多</p>
            </li>
            <li class="red">
              <div class="circle"></div>
              <p class="text">過多</p>
            </li>
          </ul>
        </div>
        <div class="light-main">
          <p class="title-s text-center" v-if="isLoading">資料載入中...請稍候...</p>
          <ul class="lights" v-if="!isLoading && shelterData.length > 0">
            <Light v-for="item in shelterData" :key="item.ID" :data="item" />
          </ul>
          <div class="update text" v-if="!isLoading">資料更新時間：{{ recentYear + 1911 }} 年 {{ recentMonth }} 月</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Light from '../components/Light'
import { onMounted, ref } from 'vue'

export default {
  name: 'ShelterInfo',
  components: { Light },
  setup(){
    const shelterApiUrl = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=p9yPwrCs2OtC';
    let isLoading = ref(false);
    let shelterData = ref([]); // 今年資料
    let recentYear = ref();
    let recentMonth = ref();

    isLoading.value = true;
    fetch(shelterApiUrl, {method: 'get'})
      .then(res => {
        if (res.ok){
          return res.json()
        } else {
          console.log('fail to connect api');
        }
      })
      .then(data => {
        // 找出資料中最新的年月
        let yearSet = new Set();
        data.forEach(item => yearSet.add(item['rpt_year']));
        recentYear.value = Math.max(...yearSet);
        let monthSet = new Set();
        data.forEach(item => item['rpt_year'] === recentYear.value && monthSet.add(item['rpt_month']));
        recentMonth.value = Math.max(...monthSet);
        // 撈出最近期的資料 + 排序
        shelterData.value = data.filter(item => item['rpt_year'] === recentYear.value && item['rpt_month'] === recentMonth.value);
        shelterData.value.sort((a,b) => a['rpt_country_code'] > b['rpt_country_code'] ? 1 : -1);

        setTimeout(() => isLoading.value = false, 1000);
      })
      .catch(err => {
        console.log(err,'connection error');
      })

    onMounted(() => {
      document.querySelector('.main').style.paddingTop = `${document.querySelector('.header').offsetHeight}px`;
    })

    return { shelterData, isLoading, recentYear, recentMonth }
  }
}
</script>

<style lang="scss">
.light-intro {
  margin: 50px 0 100px 0;
  text-align: center;
  .light-demo {
    display: flex;
    justify-content: center;
    & > li + li {
      margin-left: 50px;
    }
    .circle {
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
      border-radius: 500px;
    }
    .green .circle { background: $green; }
    .yellow .circle { background: $yellow; }
    .red .circle { background: $red; }
  }
  .light-title {
    @media (max-width: 650px) {
      font-size: 26px;
    }
  }
  .br {
    display: none;
    @media (max-width: 650px) {
      display: block;
    }
  }
}
.light-main {
  margin-bottom: 80px;
  .lights {
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 500px) {
      flex-direction: column;
    }
  }
  .update {
    text-align: right;
  }
}
</style>