import {
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';

const Announcement = ({ title, date, text, image }) => {

  return (
    <Paper sx={{
      padding: 3,
      backgroundColor: 'rgb(255, 255, 255, 0.94)',
    }}>
      <Grid container textAlign="center" spacing={4} >
        <Grid item container justifyContent='center' xs={5} sm={4} md={2} style={{ maxHeight: '20vh' }}>
          <img src={process.env.PUBLIC_URL + image} alt='' height='100%' />
        </Grid>
        <Grid item xs={7} sm={8} md={10} container direction='column' justifyContent='space-evenly' spacing={1}>
          <Grid item container alignItems='flex-end' spacing={1}>
            <Grid item>
              <Typography
                variant="h3"
                sx={{
                  fontSize: 30,
                  color: '#4d4a70',
                }}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>
                {date}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              color="textSecondary">
              {text}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Announcement;