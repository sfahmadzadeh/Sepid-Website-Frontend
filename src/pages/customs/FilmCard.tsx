import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import MovieIcon from '@mui/icons-material/Movie';
import { Button, CardActions } from '@mui/material';

type FilmCardPropsType = {
  filmName: string;
  releasedCities: string[];
  picture: string;
  director: string;
  description: string;
}

const FilmCard: React.FC<FilmCardPropsType> = ({
  filmName,
  releasedCities,
  picture,
  director,
  description,
}) => {

  const onButtonClick = () => {

  }

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 345,
      boxShadow: 3
    }}>
      <CardMedia
        component="img"
        height="300"
        image={picture}
        alt={filmName}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', paddingBottom: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {filmName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          فیلمی از {director}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        {/* <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
          {releasedCities.map((city) => (
            <Chip
              key={city}
              label={city}
              size="small"
              icon={<MovieIcon />}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box> */}
      </CardContent>
      <CardActions>
        <Button variant='contained' fullWidth color="primary" onClick={onButtonClick}>
          {'دریافت کد تخفیف'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default FilmCard;