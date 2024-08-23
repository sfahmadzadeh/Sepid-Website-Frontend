import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';


const MentorFSMCard = ({
  id,
  name,
  cover_page,
  description,
}) => {
  const { programSlug } = useParams();

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
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained" fullWidth color="primary"
          component={Link} to={`/program/${programSlug}/fsm/${id}/manage/`}>
          {'ویرایش کارگاه'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MentorFSMCard;
