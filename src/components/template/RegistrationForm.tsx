import { Button, Paper as MUIPaper, Stack, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AreYouSure from 'components/organisms/dialogs/AreYouSure';
import {
  getOneRegistrationFormAction,
  submitRegistrationFormAction,
} from 'redux/slices/programs';
import ProgramInfo from 'components/organisms/ProgramInfo';
import { RegistrationFormType } from 'types/models';
import useCollectWidgetsAnswers from 'components/hooks/useCollectWidgetsAnswers';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';
import Paper from './Paper';


type RegistrationFormPropsType = {
  registrationForm: RegistrationFormType;
  submitRegistrationForm: any;
  onSuccess?: any;
  onFailure?: any;
}

const RegistrationForm: FC<RegistrationFormPropsType> = ({
  registrationForm,
  submitRegistrationForm,
  onSuccess,
  onFailure,
}) => {
  const { programId } = useParams();
  const [isDialogOpen, setDialogStatus] = useState(false);
  const { answers } = useCollectWidgetsAnswers([]);
  const { data: program } = useGetProgramQuery({ programId });

  const submit = () => {
    submitRegistrationForm({
      id: registrationForm.id,
      answers,
      programId,
      onSuccess,
      onFailure,
    });
  };

  const isSubmitButtonDisabled = (): { isDisabled: boolean; message: string; } => {
    return {
      isDisabled:
        program.user_registration_status == 'DeadlineMissed' ||
        program.user_registration_status == 'NotPermitted' ||
        program.user_registration_status == 'GradeNotAvailable' ||
        program.user_registration_status == 'StudentshipDataIncomplete',
      message:
        program.user_registration_status == 'DeadlineMissed' ? 'مهلت ثبت‌نام تمام شده است' :
          program.user_registration_status == 'NotPermitted' ? 'با توجه به پایه تحصیلیتان، شما مجاز به شرکت در این رویداد نیستید' :
            program.user_registration_status == 'GradeNotAvailable' ? 'ابتدا پایه‌ی تحصیلی خود را انتخاب کنید' :
              program.user_registration_status == 'StudentshipDataIncomplete' ? 'مشخصات دانش‌آموزی‌تان کامل نیست' :
                'خبری نیست، سلامتی!'
    }
  }

  if (!program || !registrationForm) return null;

  return (
    <Stack spacing={2}>
      <ProgramInfo program={program} />
      <Stack width={'100%'} component={MUIPaper} padding={2} spacing={2}>
        <Paper paperId={registrationForm.id} />
        {isSubmitButtonDisabled().isDisabled &&
          <Typography color={'red'} textAlign={'center'} fontSize={24} fontWeight={400}>
            {isSubmitButtonDisabled().message}
          </Typography>
        }
        <Button
          disabled={isSubmitButtonDisabled().isDisabled}
          variant="contained"
          color="primary"
          onClick={() => setDialogStatus(true)}>
          {'ثبت‌نام'}
        </Button>
      </Stack >
      <AreYouSure
        open={isDialogOpen}
        handleClose={() => {
          setDialogStatus(!isDialogOpen);
        }}
        callBackFunction={submit}
      />
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.account.userInfo,
  registrationForm: state.programs.registrationForm,
  isFetching: state.programs.isFetching,
});

export default connect(mapStateToProps, {
  getOneRegistrationForm: getOneRegistrationFormAction,
  submitRegistrationForm: submitRegistrationFormAction,
})(RegistrationForm);
