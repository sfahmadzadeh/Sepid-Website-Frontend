import { SchoolStudentshipType } from "commons/types/profile";

const isSchoolStudentshipProfileComplete = (SchoolStudentshipProfile: SchoolStudentshipType) => {
  if (!SchoolStudentshipProfile.grade ||
    !SchoolStudentshipProfile.school) {
    return false;
  }
  return true;
}

export default isSchoolStudentshipProfileComplete;