import { Button, Paper as MUIPaper, Stack, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AreYouSure from 'components/organisms/dialogs/AreYouSure';
import {
  submitRegistrationFormAction,
} from 'redux/slices/programs';
import ProgramInfo from 'components/organisms/ProgramInfo';
import useCollectWidgetsAnswers from 'components/hooks/useCollectWidgetsAnswers';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';
import Paper from './Paper';
import { useGetMyReceiptQuery } from 'redux/features/form/ReceiptSlice';
import { useGetFormQuery } from 'redux/features/form/FormSlice';


type RegistrationFormPropsType = {
  submitRegistrationForm: any;
  onSuccess?: any;
  onFailure?: any;
}

const RegistrationForm: FC<RegistrationFormPropsType> = ({
  submitRegistrationForm,
  onSuccess,
  onFailure,
}) => {
  const { programId } = useParams();
  const [isDialogOpen, setDialogStatus] = useState(false);
  const { answers } = useCollectWidgetsAnswers([]);
  const { data: program } = useGetProgramQuery({ programId });
  const { data: registrationForm } = useGetFormQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const { data: registrationReceipt } = useGetMyReceiptQuery({ formId: program.registration_form });

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
        registrationReceipt.status == 'DeadlineMissed' ||
        registrationReceipt.status == 'NotPermitted' ||
        registrationReceipt.status == 'GradeNotAvailable' ||
        registrationReceipt.status == 'StudentshipDataIncomplete',
      message:
        registrationReceipt.status == 'DeadlineMissed' ? 'مهلت ثبت‌نام تمام شده است' :
          registrationReceipt.status == 'NotPermitted' ? 'با توجه به پایه تحصیلیتان، شما مجاز به شرکت در این رویداد نیستید' :
            registrationReceipt.status == 'GradeNotAvailable' ? 'ابتدا پایه‌ی تحصیلی خود را انتخاب کنید' :
              registrationReceipt.status == 'StudentshipDataIncomplete' ? 'مشخصات دانش‌آموزی‌تان کامل نیست' :
                'خبری نیست، سلامتی!'
    }
  }

  if (!program || !registrationForm || !registrationReceipt) return null;

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


export default connect(null, {
  submitRegistrationForm: submitRegistrationFormAction,
})(RegistrationForm);
