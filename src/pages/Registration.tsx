import { Stack, Grid, Button } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Stepper from 'components/organisms/Stepper';
import {
  getOneRegistrationFormAction,
} from 'redux/slices/programs';
import Layout from 'components/template/Layout';
import { ProgramType, RegistrationFormType } from 'types/models';
import useRegistrationSteps from 'components/hooks/useRegistrationSteps';
import { UserInfoType } from 'types/profile';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';

type RegistrationProcessPropsType = {
  registrationForm: RegistrationFormType;
  userInfo: UserInfoType;
  getOneRegistrationForm: any;
}

const RegistrationProcess: FC<RegistrationProcessPropsType> = ({
  registrationForm,
  userInfo,
  getOneRegistrationForm,
}) => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { data: program } = useGetProgramQuery({ programId });
  const {
    currentStepNameIndex,
    lastActiveStepIndex,
    steps,
  } = useRegistrationSteps({ program, registrationForm });

  useEffect(() => {
    if (program?.registration_form) {
      getOneRegistrationForm({ id: program.registration_form });
    }
  }, [program?.registration_form]);

  if (!program || !registrationForm || !userInfo) return null;

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
            {steps[currentStepNameIndex] ?
              steps[currentStepNameIndex].component :
              null}
          </Stack>
        </Grid>
      </Grid>
    </Layout >
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.account.userInfo,
  registrationForm: state.programs.registrationForm,
});

export default connect(mapStateToProps, {
  getOneRegistrationForm: getOneRegistrationFormAction,
})(RegistrationProcess);
