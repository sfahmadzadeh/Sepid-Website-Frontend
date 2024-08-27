import React, { Fragment, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import DiscountDialog from './DIscounCodeDialog';
import { FilmType } from './types';
import useGetDiscountCode from './apis/useGetDiscountCode';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from 'redux/features/party/ProfileSlice';
import { getCityByName } from 'utils/iran';
import { toast } from 'react-toastify';

type FilmCardPropsType = {
  film: FilmType;
}

const FilmCard: React.FC<FilmCardPropsType> = ({
  film,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getDiscountCode, discountCode, loading, error } = useGetDiscountCode();
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const { data: userProfile } = useGetUserProfileQuery({ userId: userInfo.id });

  const handleOpenDialog = () => {
    getDiscountCode({ filmId: film.id, cityId: getCityByName(userProfile?.city)?.id });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (discountCode) {
      setIsDialogOpen(true);
    }
  }, [loading])

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  if (!film) {
    return null;
  }

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
          image={film.image}
          alt={film.name}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', paddingBottom: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {film.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            فیلمی از {`${film.director.first_name} ${film.director.last_name}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {film.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button disabled={loading} variant='contained' fullWidth color="primary" onClick={handleOpenDialog}>
            {'دریافت کد تخفیف'}
          </Button>
        </CardActions>
      </Card>
      <DiscountDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        filmName={film.name}
        discountCode={discountCode}
      />
    </Fragment>
  );
};

export default FilmCard;