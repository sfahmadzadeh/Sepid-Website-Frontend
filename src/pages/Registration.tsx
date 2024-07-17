import { Stack, Grid } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stepper from 'components/organisms/Stepper';
import Layout from 'components/template/Layout';
import useRegistrationSteps from 'components/hooks/useRegistrationSteps';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';

type RegistrationProcessPropsType = {}

const RegistrationProcess: FC<RegistrationProcessPropsType> = ({ }) => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { data: program } = useGetProgramQuery({ programId });
  const {
    currentStepNameIndex,
    lastActiveStepIndex,
    steps,
  } = useRegistrationSteps({ program });

  if (currentStepNameIndex === steps.length - 1) {
    navigate(`/program/${programId}/`);
    window.location.reload();
  }

  return (
    <Layout appbarMode='PROGRAM'>
      <Grid container spacing={2}
        alignItems={{ xs: 'center', md: 'start' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}>
        <Grid item xs={12} md={3} position={{ xs: null, md: 'sticky' }} top={0}>
          <Stepper steps={steps} activeStepIndex={lastActiveStepIndex} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack>
            {steps[currentStepNameIndex]?.component}
          </Stack>
        </Grid>
      </Grid>
    </Layout >
  );
};

export default RegistrationProcess;
