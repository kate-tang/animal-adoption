const handleApiValue = (obj) => {
  const age = ({
    'ADULT': '成年',
    'CHILD': '幼年',
    '': 'N/A'
  })[obj.animal_age];

  const bodytype = ({
    'BIG': '大型',
    'MEDIUM': '中型',
    'SMALL': '小型',
    '': 'N/A'
  })[obj.animal_bodytype];

  const foundplace = obj.animal_foundplace;

  const gender = ({
    'M': '公',
    'F': '母',
    'N': 'N/A',
    '': 'N/A'
  })[obj.animal_sex];

  const id = obj.animal_id;

  let image = '';
  // fix url error
  if (!obj.album_file){
    image = require('@/assets/no-image.jpg');
  } else if (obj.album_file === 'https://asms.coa.gov.tw/amlapp/upload/pic/b754fd0b-be4e-4a98-92b5-f9791b379434_org.jpg' || obj.album_file === 'https://asms.coa.gov.tw/amlapp/upload/pic/73a2bdbb-c814-4c63-905c-15654623bffe_org.jpg'){
    image = require('@/assets/no-image.jpg');
  } else if (obj.album_file.includes('_orgjpeg')){
    image = obj.album_file.trim().replace('._orgjpeg', '_org.jpeg');
  } else {
    image = obj.album_file.trim();
  }

  const kind = obj.animal_kind.trim() ? obj.animal_kind.trim() : 'N/A';

  const remark = obj.animal_remark;

  const shelter = obj.shelter_name.trim() ? obj.shelter_name.trim() : 'N/A';

  const shelter_address = obj.shelter_address;
  
  const shelter_county = shelter.substring(0, 3);

  const shelter_tel = obj.shelter_tel;
  
  return { age, bodytype, foundplace, gender, id, image, kind, remark, shelter, shelter_address, shelter_county, shelter_tel }
}

export default handleApiValue