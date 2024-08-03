import { InstituteType } from "types/profile";

const SCHOOL_TYPES = {
  'Elementary': 'دبستان',
  'JuniorHigh': 'دبیرستان دوره اول',
  'High': 'دبیرستان دوره دوم',
  'SchoolOfArt': 'هنرستان',
}

const GENDER_TYPE = {
  'Male': 'پسرانه',
  'Female': 'دخترانه',
}

const getInstituteFullName = (institute: InstituteType) => {
  if (!institute) {
    return 'نامشخص';
  }
  return (`${SCHOOL_TYPES[institute.school_type] ? SCHOOL_TYPES[institute.school_type] + ' ' : ''}${GENDER_TYPE[institute.gender_type] ? GENDER_TYPE[institute.gender_type] + ' ' : ''}${institute.name}`)
}

export default getInstituteFullName;