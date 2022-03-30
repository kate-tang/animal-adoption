const populateFilterOptions = (data, kindOption, genderOption, bodytypeOption, ageOption, shelterOption) => {

  // 抓出每個select有哪些option放進set裡
  let kindSet = new Set();
  let genderSet = new Set();
  let bodytypeSet = new Set();
  let ageSet = new Set();
  let shelterSet = new Set();
  data.map(item => {
    kindSet.add(item.animal_kind);
    genderSet.add(item.animal_sex);
    bodytypeSet.add(item.animal_bodytype);
    ageSet.add(item.animal_age);
    shelterSet.add(item.shelter_name);
  })

  // 排序set，並轉為array
  // 各項排序依據
  const kindOrder = ["狗", "貓"];
  const genderOrder = ["M", "F"];
  const bodytypeOrder = ["BIG", "MEDIUM", "SMALL"];
  const ageOrder = ["ADULT", "CHILD"];
  const cityOrder = ["基隆市", "臺北市", "新北市", "桃園市", "新竹縣", "新竹市", "苗栗縣", "南投縣", "臺中市", "彰化縣", "雲林縣", "嘉義縣", "嘉義市", "臺南市", "高雄市", "屏東縣", "臺東縣", "花蓮縣", "宜蘭縣", "澎湖縣", "金門縣", "連江縣"];
  function handleOrder(data, rule){
    let finalArr = [];
    // 先照現有的排序依據來排
    for (let i = 0; i < rule.length; i++){
      data.forEach(item => item.includes(rule[i]) && finalArr.push(item) && data.delete(item));
    }
    // 剩下的排在後面
    if (data.size){
      for (let i = 0; i < data.size; i++){
        data.forEach(item => finalArr.push(item) && data.delete(item));
      }
    }
    return finalArr
  }
  let kindArr = handleOrder(kindSet, kindOrder);
  let genderArr = handleOrder(genderSet, genderOrder);
  let bodytypeArr = handleOrder(bodytypeSet, bodytypeOrder);
  let ageArr = handleOrder(ageSet, ageOrder);
  let shelterArr = handleOrder(shelterSet, cityOrder);
  
  // 拿排好的array製作select option
  const lookup = {
    kind: {
      '狗': 'dog',
      '貓': 'cat'
    },
    gender: {
      'M': '公',
      'F': '母'
    },
    bodytype: {
      'BIG': '大型',
      'MEDIUM': '中型',
      'SMALL': '小型',
    },
    age: {
      'ADULT': '成年',
      'CHILD': '幼年'
    }
  }
  kindArr.forEach((item) => {
    if (item === 'N' || item === 'N/A' || !item){ return }
    let el = document.createElement('option');
    el.textContent = item;
    el.value = lookup.kind[item] ? lookup.kind[item] : item;
    kindOption.value.appendChild(el);
  })
  genderArr.forEach((item) => {
    if (item === 'N' || item === 'N/A' || !item){ return }
    let el = document.createElement('option');
    el.textContent = lookup.gender[item] ? lookup.gender[item] : item;
    el.value = item;
    genderOption.value.appendChild(el);
  })
  bodytypeArr.forEach((item) => {
    if (item === 'N' || item === 'N/A' || !item){ return }
    let el = document.createElement('option');
    el.textContent = lookup.bodytype[item] ? lookup.bodytype[item] : item;
    el.value = item;
    bodytypeOption.value.appendChild(el);
  })
  ageArr.forEach((item) => {
    if (item === 'N' || item === 'N/A' || !item){ return }
    let el = document.createElement('option');
    el.textContent = lookup.age[item] ? lookup.age[item] : item;
    el.value = item;
    ageOption.value.appendChild(el);
  })
  shelterArr.forEach((item) => {
    if (item === 'N' || item === 'N/A' || !item){ return }
    let el = document.createElement('option');
    el.textContent = item;
    el.value = item;
    shelterOption.value.appendChild(el);
  })
}

export default populateFilterOptions