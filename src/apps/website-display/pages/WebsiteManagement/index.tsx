import React, { useEffect, FC } from 'react';
import { Box, Button, ButtonGroup, Grid, Paper } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ClassIcon from '@mui/icons-material/Class';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExtensionIcon from '@mui/icons-material/Extension';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Layout from 'commons/components/template/Layout';
import WebsiteInfoTab from './Info';
import ProgramsTab from './Programs';
import StatisticsTab from './Statistics';
import ArticlesTab from './Articles';
import ThirdPartiesTab from './ThirdParties';
import AppearanceTab from './Appearance';
import { DashboardTabType } from 'commons/types/global';

const tabs: DashboardTabType[] = [
  {
    name: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: WebsiteInfoTab,
  },
  {
    name: 'programs',
    label: 'دوره‌ها',
    icon: ClassIcon,
    component: ProgramsTab,
  },
  {
    name: 'articles',
    label: 'مقاله‌ها',
    icon: ClassIcon,
    component: ArticlesTab,
  },
  {
    name: 'third-parties',
    label: 'افزونه‌ها',
    icon: ExtensionIcon,
    component: ThirdPartiesTab,
    isActive: false,
  },
  {
    name: 'appearance',
    label: 'تنظیمات ظاهری',
    icon: VisibilityIcon,
    component: AppearanceTab,
    isActive: false,
  },
  {
    name: 'statistics',
    label: 'آمارها',
    icon: BarChartIcon,
    component: StatisticsTab,
    isActive: false,
  },
];

type WebsiteManagementPropsType = {

}

const WebsiteManagement: FC<WebsiteManagementPropsType> = ({

}) => {
  const t = useTranslate();
  const { websiteName, section } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!section) {
      navigate(`/website/${websiteName}/manage/info/`);
    }
  }, [section])

  const currentTab = tabs.find(tab => tab.name === section) || tabs[0];
  if (!currentTab) return null;
  const TabComponent = <currentTab.component />;

  return (
    <Layout appbarMode='WEBSITE'>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid
          container
          item
          sm={3}
          xs={12}
          direction="column"
          justifyContent="flex-start">
          <Grid item>
            <ButtonGroup variant="outlined" orientation="vertical" color="primary" fullWidth>
              {tabs.map((tab, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    navigate(`/website/${websiteName}/manage/${tabs[index].name}/`)
                  }}
                  disabled={tab.isActive === false}
                  variant={tab.name === section ? 'contained' : 'outlined'}
                  startIcon={tab.icon && <tab.icon />}>
                  {tab.label}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Box mt={1}>
            <Grid item>
              <Button
                fullWidth
                variant='outlined'
                color="primary"
                component={Link}
                to={'/'}
                startIcon={<ExitToAppIcon />}>
                {t('back')}
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={9} xs={12} >
          <Paper elevation={3} sx={{ padding: '10px 20px' }}>
            {TabComponent}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};


export default WebsiteManagement;
