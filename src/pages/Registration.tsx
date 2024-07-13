import { Stack, Grid } from '@mui/material';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Stepper from 'components/organisms/Stepper';
import Layout from 'components/template/Layout';
import useRegistrationSteps from 'components/hooks/useRegistrationSteps';
import { UserInfoType } from 'types/profile';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';

type RegistrationProcessPropsType = {
  userInfo: UserInfoType;
}

const RegistrationProcess: FC<RegistrationProcessPropsType> = ({
  userInfo,
}) => {
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
    // todo: invalidate program fetched info
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

const mapStateToProps = (state) => ({
  userInfo: state.account.userInfo,
});

export default connect(mapStateToProps)(RegistrationProcess);
