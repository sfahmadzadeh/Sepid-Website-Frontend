import React, { FC } from "react";
import CompanyProfile from "./CompanyProfile";
import IndividualProfile from "./IndividualProfile";
import TeamProfile from "./TeamProfile";
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
  if (partyType === 'team') {
    return <TeamProfile />
  }
}

export default Profile