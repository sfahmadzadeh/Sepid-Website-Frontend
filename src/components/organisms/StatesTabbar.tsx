import { Button, Grid, Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { FC, Fragment, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import CreateStateDialog from './dialogs/CreateStateDialog';

type StatesTabbarPropsType = {
  value: any;
  setValue: any;
  tabs: any[];
}

const StatesTabbar: FC<StatesTabbarPropsType> = ({
  value,
  setValue,
  tabs = [],
}) => {
  const t = useTranslate();
  const [openCreateStateDialog, setOpenCreateStateDialog] = useState(false);

  return (
    <Fragment>
      <Box sx={{
        flexGrow: 1,
        width: '100%',
        background: 'white',
      }}>
        <AppBar position="static" color="default" sx={{ background: 'white', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
          <Grid container>
            <Grid item xs={9} sm={10}>
              <Tabs
                value={value}
                onChange={(e, val) => setValue(val)}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto">
                {tabs.map((tab) => (
                  <Tab label={tab} key={tab} />
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={3} sm={2}>
              <Button
                size="small"
                fullWidth
                sx={{
                  height: '100%',
                  borderTopRightRadius: 5,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 0,
                }}
                color="primary"
                onClick={() => setOpenCreateStateDialog(true)}
                variant="contained">
                {t('createState')}
              </Button>
            </Grid>
          </Grid>
        </AppBar>
      </Box>
      <CreateStateDialog
        open={openCreateStateDialog}
        handleClose={() => setOpenCreateStateDialog(false)}
      />
    </Fragment>
  );
}

export default StatesTabbar;