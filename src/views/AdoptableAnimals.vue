<template>
  <Banner />
  <div class="adoptable main">
    <loading :active="isLoading"></loading>
    <div class="filter" ref="filter">
      <div class="container">
        <form class="filter-area">
          <div class="filter-options">
            <select ref="kindOption" v-model="kind">
              <option :value="null" selected>不限種類</option>
            </select>
            <select ref="genderOption" v-model="gender">
              <option :value="null" selected>不限性別</option>
            </select>
            <select ref="bodytypeOption" v-model="bodytype">
              <option :value="null" selected>不限體型</option>
            </select>
            <select ref="ageOption" v-model="age">
              <option :value="null" selected>不限年紀</option>
            </select>
            <select ref="shelterOption" v-model="shelter">
              <option :value="null" selected>不限收容所</option>
            </select>
          </div>
          <button type="button" class="btn btn-block" @click="filterData">搜尋</button>
        </form>
      </div>
    </div>
    <div class="alarm" v-if="!isLoading">
      <div class="container">
        <h3 class="alarm-msg text">
          {{ alarmText }} {{ alarmNum }} 隻毛小孩等待領養。領養前請謹慎考慮，不隨意棄養。
        </h3>
      </div>
    </div>
    <div class="result" v-if="!isLoading">
      <div class="container">
        <div class="cards" v-if="paginatedAdoptionData.length">
          <Card v-for="item in paginatedAdoptionData" :key="item.animal_id" :animal-data="item" :path="path" />
        </div>
        <Pagination :page="page" :total-page="totalPage" @changePage="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import Card from '../components/Card'
import Pagination from '../components/Pagination'
import populateFilterOptions from '../composables/populateFilterOptions'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AdoptableAnimals',
  components: { Banner, Card, Pagination },
  setup(){
    const VueScrollTo = require('vue-scrollto');
    const route = useRoute();
    const path = ref(route.path);
    const adoptApiUrl = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL';
    let kind = ref(null);
    let gender = ref(null);
    let bodytype = ref(null);
    let age = ref(null);
    let shelter = ref(null);
    let filter = ref(null);
    let alarmText = ref(null);
    let alarmNum = ref(null);
    let isLoading = ref(false);

    // 顯示分頁後的資料
    let page = ref(1);
    let items = 20;
    let totalPage = ref(null);
    function paginatedItems(list, itemsPerPage, currentPage){
      currentPage--;
      let start = itemsPerPage * currentPage;
      let end = start + itemsPerPage;
      paginatedAdoptionData.value = list.slice(start, end);
      totalPage.value = Math.ceil(list.length / itemsPerPage);
    }
    function changePage(p){
      page.value = p;
      let list = filteredAdoptionData.length ? filteredAdoptionData : rawAdoptionData;
      paginatedItems(list, items, page.value);
    }

    // 抓API資料
    let rawAdoptionData = [];  // 原始資料(僅排除ADOPTED和DEAD)
    let filteredAdoptionData = [];  // 下拉選單篩後資料
    let paginatedAdoptionData = ref([]);  // 分頁後當頁顯示資料
    isLoading.value = true;
    const kindOption = ref(null);
    const genderOption = ref(null);
    const bodytypeOption = ref(null);
    const ageOption = ref(null);
    const shelterOption = ref(null);
    fetch(adoptApiUrl, {method: 'get'})
      .then(res => {
        if (res.ok){
          return res.json();
        } else {
          console.log('fail to connect api');
        }
      })
      .then(data => {
        rawAdoptionData = data.filter(item => {
          return item.animal_status !== 'ADOPTED' && item.animal_status !== 'DEAD';
        });
        paginatedItems(rawAdoptionData, items, page.value);
        populateFilterOptions(rawAdoptionData, kindOption, genderOption, bodytypeOption, ageOption, shelterOption);
        alarmText.value = '目前還有';
        alarmNum.value = rawAdoptionData.length;
        isLoading.value = false;
      })
      .catch(err => {
        console.log(err,'connection error');
      })

    // 按搜尋按鈕，顯示filter資料
    function filterData(){
      isLoading.value = true;
      page.value = 1;
      // 篩出符合條件的動物
      filteredAdoptionData = rawAdoptionData.filter(item => {
        const lookup = {
          kind: {
            'dog': '狗',
            'cat': '貓'
          },
        }
        const k = kind.value ? (item.animal_kind === (lookup.kind[kind.value] ? lookup.kind[kind.value] : kind.value)) : true;
        const g = gender.value ? (item.animal_sex === gender.value) : true;
        const b = bodytype.value ? (item.animal_bodytype === bodytype.value) : true;
        const a = age.value ? (item.animal_age === age.value) : true;
        const s = shelter.value ? (item.shelter_name === shelter.value) : true;
        return k && g && b && a && s;
      });
      // 跑一下分頁
      paginatedItems(filteredAdoptionData, items, page.value);
      alarmText.value = !kind.value && !gender.value && !bodytype.value && !age.value && !shelter.value ? '目前還有' : '搜尋到';
      alarmNum.value = filteredAdoptionData.length;
      // 畫面稍微load幾秒再下滑顯示結果
      setTimeout(() => {
        isLoading.value = false;
        VueScrollTo.scrollTo(filter.value, 800, {
          easing: 'ease',
          offset: filter.value.offsetHeight - document.querySelector('.header').offsetHeight
        })
      }, 1000)
    }

    onMounted(() => {
      document.querySelector('.banner').style.paddingTop = `${document.querySelector('.header').offsetHeight}px`;
    })

    return {
      kind, gender, bodytype, age, shelter, 
      filterData, paginatedAdoptionData, path, isLoading, filter, alarmText, alarmNum, 
      kindOption, genderOption, bodytypeOption, ageOption, shelterOption,
      page, totalPage, changePage
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-area {
  margin: 30px 0;
  padding: 30px;
  border: 1px solid #CCC;
  @media (max-width: 500px) {
    padding: 0;
    border: none;
  }
}
.filter-options {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 20px;
  &.grid::after {
    content: "";
    width: 100px;
  }
  & > * {
    flex: 0 0 32%;
    margin-bottom: 15px;
    padding: 10px;
    outline: none;
  }
  & > *:nth-child(3n-1) {
    margin: 0 2%;
  }
  select {
    width: 31%;
  }
  option {
    width: auto;
    padding: 0 20px;
  }
  @media (max-width: 1000px) {
    & > * {
      flex: 0 0 48%;
    }
    & > *:nth-child(3n-1) {
      margin: 0;
    }
    & > *:nth-child(2n-1) {
      margin-right: 4%;
    }
  }
  @media (max-width: 700px) {
    & > *:last-child {
      flex: 5 0 100%;
    }
  }
}
.alarm-msg {
  margin-bottom: 30px;
  padding: 20px 30px;
  background: $primary-color;
  color: #FFF;
  @media (max-width: 768px) {
    padding: 15px 20px;
  }
}
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 30px;
  & > .card {
    flex: 0 0 24%;
  }
  .card:nth-child(4n-2), .card:nth-child(4n-1), .card:nth-child(4n) {
    margin-left: 1.33%;
  }
  @media (max-width: 1200px) {
    & > .card {
      flex: 0 0 32%;
    }
    .card:nth-child(4n-2), .card:nth-child(4n-1), .card:nth-child(4n) {
      margin-left: 0;
    }
    .card:nth-child(3n-1), .card:nth-child(3n) {
      margin-left: 2%;
    }
  }
  @media (max-width: 768px) {
    & > .card {
      flex: 0 0 48%;
    }
    .card:nth-child(3n-1), .card:nth-child(3n) {
      margin-left: 0;
    }
    .card:nth-child(2n) {
      margin-left: 4%;
    }
  }
  @media (max-width: 600px) {
    & > .card {
      flex: 0 0 100%;
    }
    .card:nth-child(2n) {
      margin-left: 0;
    }
  }
}
.pagination {
  margin-bottom: 30px;
}
</style>