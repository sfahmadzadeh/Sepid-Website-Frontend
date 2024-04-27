import {
  AppBar,
  Box,
  Collapse,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import HideOnScroll from './components/HideOnScroll';
import useWidth from 'utils/UseWidth';
import { useParams } from 'react-router-dom';
import { getOneEventInfoAction } from 'redux/slices/events';
import useAppbarItems from './useAppbarModes';
import { AppbarModes } from 'types/global';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

type AppbarPropsType = {
  isMentor: boolean;
  workshop: any;
  event: any;
  mode: AppbarModes;
  showBackOnScroll?: boolean;
  hideOnScroll?: boolean;
  position: "fixed" | "absolute" | "sticky" | "static" | "relative";
  mentorId: string;
  getOneEventInfo: any;
}

const ResponsiveAppBar: FC<AppbarPropsType> = ({
  isMentor,
  workshop,
  event,
  mode,
  showBackOnScroll = false,
  hideOnScroll = false,
  position = 'fixed',
  mentorId,
  getOneEventInfo,
}) => {
  const { programId } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openToolbar, setOpenToolbar] = useState(true);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 30 });
  const width = useWidth();
  const appbarItems = useAppbarItems({ mode, fsm: workshop, program: event, mentorId });

  useEffect(() => {
    if (!event && programId) {
      getOneEventInfo({ programId });
    }
  }, [event, programId]);

  if (mode === 'None') return null;

  const {
    toolbarItems,
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  } = appbarItems;

  const rightItems = width === 'xs' ? mobileRightItems : desktopRightItems;
  const leftItems = width === 'xs' ? mobileLeftItems : desktopLeftItems;

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={() => { }}>
      MUI
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={() => { }}
    >
      Core
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  return (
    <Fragment>
      <HideOnScroll disable={!hideOnScroll}>
        <AppBar
          sx={
            (showBackOnScroll && !trigger) ?
              {
                transition: '0.2s',
                background: 'transparent',
                boxShadow: 'none',
                paddingTop: 4,
                zIndex: 1,
              } :
              {
                transition: '0.2s',
                zIndex: 1,
              }
          }
          position={position}
          color='inherit'>
          <Container>
            <Toolbar disableGutters>
              <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} spacing={1}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={1}>
                  {mobileMenuListItems.length > 0 && (
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setDrawerOpen(!drawerOpen)}>
                        <MenuIcon fontSize='large' />
                      </IconButton>
                    </Box>
                  )}
                  {rightItems.map((item, index) => (
                    <Fragment key={index}>
                      {item}
                    </Fragment>
                  ))}
                </Stack>
                <Stack direction={'row-reverse'} alignItems={'center'} justifyContent={'space-between'} spacing={1}>
                  {leftItems.map((item, index) => (
                    <Fragment key={index}>
                      {item}
                    </Fragment>
                  ))}
                  {toolbarItems?.length > 0 &&
                    <Tooltip title='جعبه ابزار' arrow>
                      <IconButton onClick={() => setOpenToolbar(!openToolbar)}>
                        <HomeRepairServiceIcon />
                      </IconButton>
                    </Tooltip>
                  }
                </Stack>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
        {toolbarItems?.length > 0 &&
          <Collapse in={openToolbar}>
            <Container>
              <Toolbar variant='dense' disableGutters
                sx={{
                  padding: 1,
                  paddingX: 2,
                  borderBottomRightRadius: 16,
                  borderBottomLeftRadius: 16,
                  backgroundColor: '#EDF2FA',
                }}>
                <Stack width={'100%'} direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={1}>
                  {toolbarItems.reverse().map((item, index) => (
                    <Fragment key={index}>
                      {item}
                    </Fragment>
                  ))}
                </Stack>
              </Toolbar>
            </Container>
          </Collapse>
        }
      </HideOnScroll>
      <Drawer
        anchor="left" open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 240 }}>
          {mobileMenuListItems.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
      </Drawer>
    </Fragment >
  );
}

const mapStateToProps = (state) => ({
  isMentor: state.account.userInfo?.isMentor,
  event: state.events.event,
  workshop: state.workshop.workshop,
  mentorId: state.account.userInfo?.id,
})

export default connect(mapStateToProps, {
  getOneEventInfo: getOneEventInfoAction,
})(ResponsiveAppBar);