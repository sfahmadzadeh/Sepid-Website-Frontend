import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import UserSetting from 'components/template/Setting/UserSetting';
import SchoolSetting from 'components/template/Setting/SchoolSetting';
import UniversitySetting from 'components/template/Setting/UniversitySetting';
import { getUserProfileAction } from 'redux/slices/account';
import { UserInfoType } from 'types/profile';

type SettingPropsType = {
  userInfo: UserInfoType;
  type: 'user' | 'school' | 'university';
  getUserProfile: any;
  onSuccessfulSubmission?: any;
}

const Setting: FC<SettingPropsType> = ({
  userInfo,
  type,
  getUserProfile,
  onSuccessfulSubmission,
}) => {

  useEffect(() => {
    if (userInfo?.id) {
      getUserProfile({ id: userInfo.id });
    }
  }, [userInfo?.id]);

  if (type === 'user') return <UserSetting onSuccessfulSubmission={onSuccessfulSubmission} />
  if (type === 'school') return <SchoolSetting onSuccessfulSubmission={onSuccessfulSubmission} />
  if (type === 'university') return <UniversitySetting onSuccessfulSubmission={onSuccessfulSubmission} />
};

const mapStateToProps = (state) => ({
  userInfo: state.account.userInfo,
});

export default connect(mapStateToProps, {
  getUserProfile: getUserProfileAction,
})(Setting);