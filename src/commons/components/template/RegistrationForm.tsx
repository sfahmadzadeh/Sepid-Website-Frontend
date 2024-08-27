import { Button, Paper as MUIPaper, Stack, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure';
import ProgramInfo from 'commons/components/organisms/ProgramInfo';
import useCollectWidgetsAnswers from 'commons/components/hooks/useCollectWidgetsAnswers';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import Paper from './Paper';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import { useGetFormQuery, useSubmitFormMutation } from 'apps/website-display/redux/features/form/FormSlice';
import { toast } from 'react-toastify';

type RegistrationFormPropsType = {
  onSuccess?: any;
  onFailure?: any;
}

const RegistrationForm: FC<RegistrationFormPropsType> = ({
  onSuccess,
  onFailure,
}) => {
  const { programSlug } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setDialogStatus] = useState(false);
  const { answers, getAnswerCollector } = useCollectWidgetsAnswers([]);
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: registrationForm } = useGetFormQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const { data: registrationReceipt } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const [submitRegistrationForm, submitRegistrationFormResult] = useSubmitFormMutation();

  const submit = () => {
    submitRegistrationForm({
      answer_sheet_type: 'RegistrationReceipt',
      formId: registrationForm.id,
      answers,
    });
  };

  useEffect(() => {
    if (submitRegistrationFormResult?.isSuccess) {
      toast.success('فرم ثبت‌نام با موفقیت تکمیل شد.')
      onSuccess?.();
    }
    if (submitRegistrationFormResult?.isError) {
      onFailure?.();
    }
  }, [submitRegistrationFormResult])

  const isSubmitButtonDisabled = (): { isDisabled: boolean; message: string; } => {
    return {
      isDisabled:
        registrationReceipt.status == 'DeadlineMissed' ||
        registrationReceipt.status == 'NotPermitted' ||
        registrationReceipt.status == 'GradeNotAvailable' ||
        registrationReceipt.status == 'StudentshipDataIncomplete',
      message:
        registrationReceipt.status == 'DeadlineMissed' ? 'مهلت ثبت‌نام تمام شده است' :
          registrationReceipt.status == 'NotPermitted' ? 'با توجه به پایه تحصیلیتان، شما مجاز به شرکت در این دوره نیستید' :
            registrationReceipt.status == 'GradeNotSuitable' ? 'با توجه به پایه تحصیلیتان، شما مجاز به شرکت در این دوره نیستید' :
              registrationReceipt.status == 'GradeNotAvailable' ? 'ابتدا پایه‌ی تحصیلی خود را انتخاب کنید' :
                registrationReceipt.status == 'StudentshipDataIncomplete' ? 'مشخصات دانش‌آموزی‌تان کامل نیست' :
                  'خبری نیست، سلامتی!'
    }
  }

  useEffect(() => {
    // todo: when registration form is editable, this "if" should be removed
    if (registrationReceipt?.is_participating) {
      navigate(`/program/${programSlug}/`);
    }
  }, [registrationReceipt])

  if (!program || !registrationForm || !registrationReceipt) return null;

  return (
    <Stack spacing={2}>
      <ProgramInfo program={program} />
      <Stack width={'100%'} component={MUIPaper} padding={2} spacing={2}>
        <Paper
          mode='form'
          paperId={registrationForm.id}
          answers={answers}
          getAnswerCollector={getAnswerCollector}
        />
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

export default RegistrationForm;