import { SchoolStudentshipType } from "types/profile";

const isUserSchoolStudentshipProfileComplete = (userSchoolStudentshipProfile: SchoolStudentshipType) => {
  if (!userSchoolStudentshipProfile.grade ||
    !userSchoolStudentshipProfile.school) {
    return false;
  }
  return true;
}

export default isUserSchoolStudentshipProfileComplete;