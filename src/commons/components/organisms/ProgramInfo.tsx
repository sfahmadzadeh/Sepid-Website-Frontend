import { Stack, Paper, Typography } from '@mui/material';
import React, { FC } from 'react';
import { ProgramType } from 'commons/types/models';
import useWidth from 'commons/utils/UseWidth';
import { toPersianNumber } from 'commons/utils/translateNumber';

type ProgramInfoPropsType = {
  program: ProgramType;
}

const ProgramInfo: FC<ProgramInfoPropsType> = ({
  program,
}) => {
  const width = useWidth();

  return (
    <Stack
      component={Paper}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        width: '100%',
        padding: '0px !important',
        display: 'flex',
      }}
      alignItems='center'
      justifyContent="space-between">
      <img
        src={program.cover_page}
        alt=""
        style={width == 'xs' ? {
          flex: 0,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          width: '100%',
          objectFit: 'cover',
        } : {
          flex: 0,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          maxWidth: '40%',
          objectFit: 'cover',
        }}
      />
      <Stack spacing={2} sx={{ padding: 2, flex: 1 }}>
        {program.name && (
          <Typography gutterBottom align="center" variant="h1">{program.name}</Typography>
        )}
        <Typography align="center">{program.description}</Typography>
        {/* todo: this sentence may cause misunderstanding: */}
        {/* {program.participation_type == 'Team' && (
          <Typography align="center">{`شرکت در این دوره در قالب تیم‌های ${toPersianNumber(program.team_size)} نفره امکان‌پذیر است.`}</Typography>
        )} */}
        {program.participation_type == 'Individual' && (
          <Typography align="center">{'شرکت در این دوره به صورت فردی است.'}</Typography>
        )}
        {program.is_free &&
          <Typography align="center">{'هزینه‌ی ثبت‌نام رایگان است!'}</Typography>
        }
        <div />
      </Stack>
    </Stack>

  );
};

export default ProgramInfo;
