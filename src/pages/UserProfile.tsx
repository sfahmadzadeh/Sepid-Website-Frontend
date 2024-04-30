import { Grid, Tab, Tabs } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from 'components/template/Layout';
import ProfileTemplate from 'components/template/Profile';
import {
  getUserProfileAction,
} from 'redux/slices/account';
import { DashboardTabType } from 'types/global';
import { UserInfoType } from 'types/profile';
import { useGetProgramQuery } from 'redux/features/ProgramSlice';

let tabs: DashboardTabType[] = [
  {
    name: 'personal',
    label: 'مشخصات فردی',
    icon: '',
    component: <ProfileTemplate type='personal' />,
    isActive: true,
  },
  {
    name: 'student',
    label: 'مشخصات دانش‌آموزی',
    icon: '',
    component: <ProfileTemplate type='student' />,
    isActive: true,
  },
  {
    name: 'academic',
    label: 'مشخصات دانشجویی',
    icon: '',
    component: <ProfileTemplate type='academic' />,
    isActive: false,
  },
];

type ProfilePropsType = {
  getUserProfile: any;
  userInfo: UserInfoType;
}

const Profile: FC<ProfilePropsType> = ({
  getUserProfile,
  userInfo,
}) => {
  const navigate = useNavigate();
  const { programId, section } = useParams();
  const { data: program } = useGetProgramQuery({ programId }, { skip: !Boolean(programId) });

  useEffect(() => {
    if (!section) {
      if (programId) {
        navigate(`/program/${programId}/user-profile/personal/`);
      } else {
        navigate('/user-profile/personal/');
      }
    }
  }, [section])

  useEffect(() => {
    if (userInfo?.id) {
      getUserProfile({ id: userInfo.id });
    }
  }, [userInfo?.id]);

  if (program?.audience_type == 'Student') {
    tabs = [tabs[0], tabs[1]];
  } else if (program?.audience_type == 'Academic') {
    tabs = [tabs[0], tabs[2]];
  } else if (program?.audience_type == 'All') {
    tabs = [tabs[0]];
  }

  if (!section) return null;

  const tab: DashboardTabType = tabs.find(tab => tab.name == section);

  return (
    <Layout appbarMode={programId ? 'PROGRAM' : 'DASHBOARD'}>
      <Grid
        container
        justifyContent="center"
        spacing={4}>
        <Grid container item xs={12} sm={3} direction='column' spacing={2}>
          <Grid item>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tabs.indexOf(tab)}
              onChange={(event, newValue) => navigate(programId ? `/program/${programId}/user-profile/${tabs[newValue].name}/` : `/user-profile/${tabs[newValue].name}/`)}>
              {
                tabs.map((tab, index) => {
                  return (
                    <Tab disabled={!tab.isActive} key={index} label={tab.label} />
                  )
                })
              }
            </Tabs>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={9}>
          {tab.component}
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.account.userInfo,
  event: state.events.event,
});

export default connect(mapStateToProps, {
  getUserProfile: getUserProfileAction,
})(Profile);