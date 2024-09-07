import {
  Button,
  Card,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProgramType } from 'commons/types/models';

type ProgramButtonPropsType = {
  to?: string;
  text: string;
  disabled?: boolean;
}

const ProgramButton: FC<ProgramButtonPropsType> = ({
  to,
  text,
  disabled = false,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      size="small"
      variant="outlined"
      fullWidth
      color="secondary"
      disabled={disabled}
      onClick={to ? () => navigate(to) : null}>
      {text}
    </Button>)
}

type ManageProgramCardPropsType = {
  program: ProgramType;
}

const ManageProgramCard: FC<ManageProgramCardPropsType> = ({
  program
}) => {
  const { programSlug } = useParams();

  return (
    <Card
      sx={{
        height: '100%',
        width: '100%',
        padding: '0px !important',
        backgroundColor: 'rgb(255, 255, 255, 0.94)',
        fontSize: '1rem',
        textDecoration: 'none',
        overflow: 'hidden',
        boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
        transition: 'all 0.1s ease-in-out',
        '&:hover': {
          transform: 'translateY(-0.1rem) scale(1.02)',
          boxShadow: '0 0.5em 2rem -1rem rgba(0, 0, 0, 0.5)',
        },
      }}>
      <Grid
        container
        alignItems='stretch'
        sx={(theme) => ({
          height: '100%',
          justifyContent: 'space-between',
          [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
          },
        })}>
        <Grid sx={{ padding: 0 }} item container justifyContent="center" alignItems="center" xs={12} md={5}>
          <img src={program.cover_page} alt=""
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }} />
        </Grid>
        <Grid xs={12} md={7} item container
          sx={{
            padding: 2,
            paddingLeft: 2,
          }}>
          <Stack justifyContent="space-between" spacing={2} sx={{ width: '100%' }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
              <Typography variant="h3"
                sx={{ color: '#4d4a70' }}>
                {program.name}
              </Typography>
            </Stack>
            <ProgramButton to={`/program/${programSlug}/manage/`} text={'ویرایش دوره'} />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ManageProgramCard;
