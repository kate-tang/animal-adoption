// 列出同一屬性的不重複值
let kind = new Set();
let gender = new Set();
let bodytype = new Set();
let age = new Set();
let shelter = new Set();
adoptionData.value.map(item => kind.add(item.animal_kind))
adoptionData.value.map(item => gender.add(item.animal_sex))
adoptionData.value.map(item => bodytype.add(item.animal_bodytype))
adoptionData.value.map(item => age.add(item.animal_age))
adoptionData.value.map(item => shelter.add(item.shelter_name))
console.log({kind, gender, bodytype, age, shelter});

let id = new Set();
adoptionData.value.map(item => id.add(item.animal_id))
console.log({id});