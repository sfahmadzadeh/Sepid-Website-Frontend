import {
  Card,
  Chip,
  Grid,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  ButtonBase,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import React, { FC } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useNavigate } from 'react-router-dom';
import { toPersianNumber } from 'utils/translateNumber';
import { ProgramType } from 'types/models';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SettingsIcon from '@mui/icons-material/Settings';

type ProgramCardPropsType = {
  program: Partial<ProgramType>;
}

const ProgramCard: FC<ProgramCardPropsType> = ({
  program
}) => {
  const t = useTranslate();
  const navigate = useNavigate();

  if (!program) return null;

  return (
    <ButtonBase
      disableRipple
      onClick={() => navigate(`/program/${program.id}/`)}>
      <Card
        sx={{
          height: { xs: 480, md: 240 },
          width: '100%',
          padding: '0px !important',
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
          sx={{
            height: '100%',
            justifyContent: { xs: 'center', md: 'space-between' },
          }}>
          <Grid
            item
            xs={12} md={5}
            sx={{
              padding: 0,
              width: '100%',
              height: { xs: 300, md: 240 },
            }}
            position={'relative'}
            justifyContent="center" alignItems="center">
            <img
              alt=""
              src={program.cover_page}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }} />
          </Grid>
          <Grid
            item
            xs={12} md={7}
            sx={{
              padding: 2,
              width: '100%',
              height: { xs: 180, md: 240 },
            }}>
            <Stack height={'100%'} justifyContent="space-between" spacing={1}>

              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
                <Typography
                  sx={{
                    color: '#4d4a70',
                    wordWrap: 'break-word',
                    whiteSpace: 'normal',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  textAlign={'start'}
                  variant="h3">
                  {program.name}
                </Typography>

                <Tooltip arrow title={'تعداد کسانی که در این برنامه ثبت‌نام کرده‌اند'}>
                  <Chip
                    size='small'
                    sx={{ userSelect: 'none', marginTop: 0.3 }}
                    icon={<PeopleAltIcon fontSize='small' />}
                    label={toPersianNumber(program.participants_count)}
                  />
                </Tooltip>
              </Stack>

              <Typography textAlign={'start'} variant="body2" color="textSecondary">
                {program.description}
              </Typography>

              <Stack spacing={1} direction={'row'}>
                <Chip
                  color='info'
                  sx={{ userSelect: 'none' }}
                  icon={<PeopleAltIcon />}
                  label={
                    program.program_type === 'Individual'
                      ? 'انفرادی'
                      : `${toPersianNumber(program.team_size)} ${t('person')}`
                  }
                />
                {!program.is_free &&
                  <Chip
                    color='success'
                    sx={{ userSelect: 'none' }}
                    icon={<InsertEmoticonIcon />}
                    label={'رایگان'}
                  />
                }
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </ButtonBase>
  );
};

export default ProgramCard;
