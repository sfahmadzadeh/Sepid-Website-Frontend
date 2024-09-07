
import React, { FC } from 'react';

const hasUserCompletedAcademicInformation = (userInfo) => {
  if (userInfo.academic_studentship) {
    // todo
  } else {
    throw new Error("Invalid State: each user must have a academic studentship");
  }
}

type UniversitySettingPropsType = {
  onSuccessfulSubmission?: Function;
}

const UniversitySetting: FC<UniversitySettingPropsType> = ({ onSuccessfulSubmission }) => {
  return null;
}

export default UniversitySetting;


