import { Grid, Tab, Tabs } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from 'components/template/Layout';
import { DashboardTabType } from 'types/global';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';
import UserSetting from 'components/template/Setting/UserSetting';
import SchoolSetting from 'components/template/Setting/SchoolSetting';
import UniversitySetting from 'components/template/Setting/UniversitySetting';

let tabs: DashboardTabType[] = [
  {
    name: 'user',
    label: 'اطلاعات فردی',
    icon: '',
    component: <UserSetting />,
    isActive: true,
  },
  {
    name: 'school',
    label: 'اطلاعات دانش‌آموزی',
    icon: '',
    component: <SchoolSetting />,
    isActive: true,
  },
  {
    name: 'university',
    label: 'اطلاعات دانشجویی',
    icon: '',
    component: <UniversitySetting />,
    isActive: false,
  },
];

type SettingPropsType = {
}

const Setting: FC<SettingPropsType> = ({ }) => {
  const navigate = useNavigate();
  const { section } = useParams();

  useEffect(() => {
    if (!section) {
      navigate('/setting/user/');
    }
  }, [section])

  if (!section) return null;

  const tab: DashboardTabType = tabs.find(tab => tab.name == section);

  return (
    <Layout appbarMode={'DASHBOARD'}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={3}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabs.indexOf(tab)}
            onChange={(event, newValue) => navigate(`/setting/${tabs[newValue].name}/`)}>
            {
              tabs.map((tab, index) => {
                return (
                  <Tab disabled={!tab.isActive} key={index} label={tab.label} />
                )
              })
            }
          </Tabs>
        </Grid>
        <Grid item xs={12} sm={9}>
          {tab.component}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Setting;