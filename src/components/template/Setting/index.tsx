import React, { FC } from 'react';
import UserSetting from 'components/template/Setting/UserSetting';
import SchoolSetting from 'components/template/Setting/SchoolSetting';
import UniversitySetting from 'components/template/Setting/UniversitySetting';

type SettingPropsType = {
  type: 'user' | 'school' | 'university';
  onSuccessfulSubmission?: any;
}

const Setting: FC<SettingPropsType> = ({
  type,
  onSuccessfulSubmission,
}) => {
  if (type === 'user') return <UserSetting onSuccessfulSubmission={onSuccessfulSubmission} />
  if (type === 'school') return <SchoolSetting onSuccessfulSubmission={onSuccessfulSubmission} />
  if (type === 'university') return <UniversitySetting onSuccessfulSubmission={onSuccessfulSubmission} />
};

export default Setting;