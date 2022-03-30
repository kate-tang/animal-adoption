<template>
  <li class="light-item" ref="light">
    <div class="place title-s">{{ data.rpt_country }}</div>
    <div class="number">
      <div class="text">容留最大值：{{ maxNum }}</div>
      <div class="text">在養數：{{ currentNum }}</div>
    </div>
  </li>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  props: ['data'],
  setup(props){
    const light = ref();

    const maxNum = ref(props.data.max_stay_num || props.data.max_stay_cat_num + props.data.max_stay_dog_num);
    const currentNum = ref(props.data.fe_sum_num);
    const percent = Math.round((currentNum.value / maxNum.value) * 100);
    const lightColor = percent < 70 ? '#99CC67' : percent < 90 ? '#FDC500' : '#FF0135';

    onMounted(() => {
      light.value.style.background = lightColor;
    })

    return { light, maxNum, currentNum }
  }
}
</script>

<style scoped lang="scss">
.light-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 18%;
  margin-bottom: 20px;
  padding: 20px 15px;
  color: #FFF;
  border-radius: 10px;
  .number {
    text-align: center;
  }
  &:nth-child(5n-3), &:nth-child(5n-2), &:nth-child(5n-1), &:nth-child(5n){
    margin-left: 2.5%;
  }
  @media (max-width: 1000px) {
    width: 23%;
    &:nth-child(5n-3), &:nth-child(5n-2), &:nth-child(5n-1), &:nth-child(5n){
      margin-left: 0;
    }
    &:nth-child(4n-2), &:nth-child(4n-1), &:nth-child(4n){
      margin-left: 2.6%;
    }
  }
  @media (max-width: 900px) {
    width: 32%;
    &:nth-child(4n-2), &:nth-child(4n-1), &:nth-child(4n){
      margin-left: 0;
    }
    &:nth-child(3n-1), &:nth-child(3n){
      margin-left: 2%;
    }
  }
  @media (max-width: 650px) {
    width: 48%;
    &:nth-child(3n-1), &:nth-child(3n){
      margin-left: 0;
    }
    &:nth-child(2n){
      margin-left: 4%;
    }
  }
  @media (max-width: 500px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px 15px;
    .place {
      margin-bottom: 0;
      font-size: 22px;
    }
    .number {
      text-align: right;
    }
    &:nth-child(2n){
      margin-left: 0;
    }
  }
  @media (max-width: 400px) {
    justify-content: space-between;
  }
}
</style>