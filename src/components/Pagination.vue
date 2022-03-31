<template>
  <div class="pagination">
    <ul>
      <li class="prev" v-if="page > 1" @click="handlePage(page - 1)"><font-awesome-icon icon="chevron-left" /></li>
      <li class="num" v-if="page > 2 && neighborLiNum < totalPage" @click="handlePage(1)">1</li>
      <li class="dot" v-if="page > 3 && neighborLiNum < totalPage - 1">...</li>
      <li class="num" v-for="p in currentPageArr" @click="handlePage(p)" :class="{ 'active' : p === page }" :key="p">{{ p }}</li>
      <li class="dot" v-if="page < totalPage - 2 && neighborLiNum < totalPage - 1">...</li>
      <li class="num" v-if="page < totalPage - 1 && neighborLiNum < totalPage" @click="handlePage(totalPage)">{{ totalPage }}</li>
      <li class="next" v-if="page < totalPage" @click="handlePage(page + 1)"><font-awesome-icon icon="chevron-right" /></li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: ['page', 'totalPage'],
  setup(props, context){
    const VueScrollTo = require('vue-scrollto');
    let totalPage = ref(props.totalPage);
    let page = ref(props.page);
    let neighborLiNum = ref(4);
    let currentPageArr = ref(populatePageArr());
    function populatePageArr(){
      if (page.value === 1){
        let arr = [];
        for (let i = 0; i < neighborLiNum.value; i++){
          let num = page.value + i
          if (num > totalPage.value){ continue }
          arr.push(num)
        }
        return arr
      } else if (page.value === 2){
        let arr = [];
        for (let i = 0; i < neighborLiNum.value; i++){
          let num = page.value + (i - 1)
          if (num > totalPage.value){ continue }
          arr.push(num)
        }
        return arr
      } else if (page.value === totalPage.value - 1){
        let arr = [];
        for (let i = neighborLiNum.value; i > 0; i--){
          let num = page.value - i + 2;
          if (num < 1){ continue }
          arr.push(num)
        }
        return arr
      } else if (page.value === totalPage.value){
        let arr = [];
        for (let i = neighborLiNum.value; i > 0; i--){
          let num = page.value - i + 1;
          if (num < 1){ continue }
          arr.push(num)
        }
        return arr
      } else {
        return [page.value - 1, page.value, page.value + 1]
      }
    }
    function handlePage(futureP){
      if (futureP === page.value){ return }
      page.value = futureP;
      currentPageArr.value = populatePageArr();
      context.emit('changePage', futureP);
      // scroll top
      let filter = document.querySelector('.filter');
      VueScrollTo.scrollTo(filter, 1000, {
        easing: 'ease',
        offset: filter.offsetHeight - document.querySelector('.header').offsetHeight
      })
    }

    return { totalPage, page, neighborLiNum, currentPageArr, handlePage }
  }
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  ul {
    display: flex;
    padding: 5px;
    border-radius: 500px;
  }
  li {
    width: 40px;
    height: 40px;
    color: $secondary-color;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    border-radius: 500px;
    user-select: none;
    &.prev, &.next, &.num {
      cursor: pointer;
      &:active, &:hover, &.active {
        background: $secondary-color;
        color: #FFF;
      }
    }
    &.num.active {
      cursor: default;
    }
    &.prev {
      border-radius: 20px 5px 5px 20px;
      font-size: 16px;
    }
    &.next {
      border-radius: 5px 20px 20px 5px;
      font-size: 16px;
    }
    & + li {
      margin-left: 5px;
    }
    @media (max-width: 768px) {
      width: 36px;
      height: 36px;
      font-size: 16px;
      line-height: 36px;
      &.prev, &.next {
        font-size: 14px;
      }
      & + li {
        margin-left: 3px;
      }
    }
    @media (max-width: 500px) {
      width: 32px;
      height: 32px;
      font-size: 14px;
      line-height: 32px;
      &.prev, &.next {
        font-size: 12px;
      }
      & + li {
        margin-left: 0;
      }
    }
  }
}
</style>