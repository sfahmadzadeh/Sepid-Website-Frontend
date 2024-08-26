import React, { Fragment, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import DiscountDialog from './DIscounCodeDialog';
import { FilmType } from './models';

type FilmCardPropsType = FilmType;

const FilmCard: React.FC<FilmCardPropsType> = ({
  name,
  image,
  director,
  description,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Fragment>
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
          image={image}
          alt={name}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', paddingBottom: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            فیلمی از {`${director.first_name} ${director.last_name}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant='contained' fullWidth color="primary" onClick={handleOpenDialog}>
            {'دریافت کد تخفیف'}
          </Button>
        </CardActions>
      </Card>
      <DiscountDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        filmName={name}
      />
    </Fragment>
  );
};

export default FilmCard;