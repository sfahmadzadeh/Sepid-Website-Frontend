import React, { FC } from "react";
import CompanyProfile from "./CompanyProfile";
import IndividualProfile from "./IndividualProfile";
import { useParams } from "react-router-dom";

type ProfilePropsType = {
}

const Profile: FC<ProfilePropsType> = ({
}) => {
  const { partyType } = useParams();
  if (partyType === 'ind') {
    return <IndividualProfile />
  }
  if (partyType === 'com') {
    return <CompanyProfile />
  }
}

export default Profile