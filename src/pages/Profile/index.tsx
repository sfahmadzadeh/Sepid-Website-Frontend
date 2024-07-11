import React, { FC } from "react";
import CompanyProfile from "./CompanyProfile";
import IndividualProfile from "./IndividualProfile";

type ProfilePropsType = {
}

const Profile: FC<ProfilePropsType> = ({
}) => {
  const type: 'individual' | 'company' = 'individual';
  if (type === 'individual') {
    return <IndividualProfile />
  }
  if (type === 'company') {
    return <CompanyProfile />
  }
}

export default Profile