import { InstituteType, SchoolType } from "commons/types/models";

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
  if (institute.institute_type === 'School') {
    const school = institute as SchoolType;
    return (`${SCHOOL_TYPES[school.school_type] ? SCHOOL_TYPES[school.school_type] + ' ' : ''}${GENDER_TYPE[school.gender_type] ? GENDER_TYPE[school.gender_type] + ' ' : ''}${institute.name}`)
  }
}

export default getInstituteFullName;