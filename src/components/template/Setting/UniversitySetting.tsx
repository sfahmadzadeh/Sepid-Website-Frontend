
import React from 'react';

const hasUserCompletedAcademicInformation = (userInfo) => {
  if (userInfo.academic_studentship) {
    // todo
  } else {
    throw new Error("Invalid State: each user must have a academic studentship");
  }
}

function UniversitySetting({ onSuccessfulSubmission }) {
  return null;
}

export default UniversitySetting;


