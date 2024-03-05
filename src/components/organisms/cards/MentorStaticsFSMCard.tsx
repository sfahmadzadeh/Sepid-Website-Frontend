import {
  Chip,
  Tooltip,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from '@mui/material';
import React from 'react';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { toPersianNumber } from 'utils/translateNumber';


const MentorStaticsFSMCard = ({
  name,
  cover_page,
  players_count,
}) => {

  return (
    <Card
      sx={{
        maxWidth: 300,
        marginTop: '0px',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%',
        width: '100%',
        padding: '0px !important',
        backgroundColor: 'rgb(255, 255, 255, 0.94)',
        fontSize: '1rem',
        textDecoration: 'none',
        overflow: 'hidden',
        boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.1s ease-in-out',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-0.1rem) scale(1.01)',
          boxShadow: '0 0.5em 1rem -1rem rgba(2, 2, 2, 2.5)',
        },
      }}>
      <CardActionArea disabled>
        {cover_page &&
          <CardMedia
            sx={{ height: 150 }}
            image={cover_page}
            title={name}
          />
        }
        <CardContent>
          <Stack spacing={1}>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Typography gutterBottom>
                افراد وارد‌شده:
              </Typography>
              <Chip
                size='small'
                sx={{ userSelect: 'none' }}
                icon={<PeopleAltIcon fontSize='small' />}
                label={toPersianNumber(players_count)}
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MentorStaticsFSMCard;
