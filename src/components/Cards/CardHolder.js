import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  makeStyles,
  Grid,
  Paper,
  ButtonGroup,
  CssBaseline,
  Hidden,
  Backdrop,
  Badge,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Box,
  Typography,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import ClassIcon from '@material-ui/icons/Class';
import { connect } from 'react-redux';
import WorkshopCard from './WorkshopCard';
import TeamCard from './TeamCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
  cardHolder: {
    padding: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
  },
}));


const CardHolder = ({ type, workshops, teams, }) => {
  const [cards, setCards] = useState();
  const classes = useStyles();

  return (
    <Grid
      container
      item
      spacing={2}
      direction="row"
      className={classes.cardHolder}
    >
      {type === 'workshops' &&
        workshops.map((workshop) => {
          return (
            <WorkshopCard {...workshop} />
          )
        })
      }

      {type === 'teams' &&
        teams.map((team) => {
          return (
            <TeamCard {...team} />
          )
        })
      }

      <Tooltip
        arrow
        title={'اضافه کردن کارگاه جدید'}
        className={classes.absolute}>
        <IconButton>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  const workshops = [
    {
      name: 'هوش مصنوعی',
      description: 'این کارگاه خیلی قشنگ است. انگشت‌های خود را هم با آن می‌خورید :/',
      teamsNumber: 3,
      mentorsNumber: 6,
    },
    {
      name: 'هوش مصنوعی',
      description: 'این کارگاه خیلی قشنگ است. انگشت‌های خود را هم با آن می‌خورید :/',
      teamsNumber: 3,
      mentorsNumber: 6,
    },
    {
      name: 'هوش مصنوعی',
      description: 'این کارگاه خیلی قشنگ است. انگشت‌های خود را هم با آن می‌خورید :/',
      teamsNumber: 3,
      mentorsNumber: 6,
    },
  ]
  const teams = [
    {
      name: 'ماهی‌ها',
    },
    {
      name: 'ماهی‌ها',
    },
    {
      name: 'ماهی‌ها',
    },
  ]
  return ({
    workshops,
    teams,
  })
}



export default connect(
  mapStateToProps,
  {

  })(CardHolder);