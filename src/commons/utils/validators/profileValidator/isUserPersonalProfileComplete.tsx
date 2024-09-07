import { UserInfoType } from "commons/types/profile";

const isUserPersonalProfileComplete = (userInfo: UserInfoType) => {
  if (
    !userInfo.first_name ||
    !userInfo.last_name ||
    !userInfo.gender ||
    !userInfo.phone_number
  ) {
    return false;
  }
  return true;
}

export default isUserPersonalProfileComplete;
