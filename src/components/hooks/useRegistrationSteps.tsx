import React, { useEffect, useState } from 'react';

import Form from 'components/template/RegistrationForm';
import RegistrationStatus from 'components/template/RegistrationStatus';
import Payment from 'components/template/Payment';
import { RegistrationStepNameType, RegistrationStepType } from 'types/global';
import Profiles from 'components/template/Profile';
import { ProgramType } from 'types/models';
import { useGetMyReceiptQuery } from 'redux/features/form/ReceiptSlice';
import { useGetFormQuery } from 'redux/features/form/FormSlice';

type propsType = {
  program: ProgramType;
}

const useRegistrationSteps = ({
  program,
}: propsType) => {
  const [currentStepNameIndex, setCurrentStepIndex] = useState<number>(0);
  const [lastActiveStepIndex, setLastActiveIndex] = useState<number>(0);
  const [steps, setSteps] = useState<RegistrationStepType[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { data: registrationForm } = useGetFormQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const { data: registrationReceipt } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });

  useEffect(() => {
    const goToStep = (destinationStepIndex: number) => {
      setCurrentStepIndex(destinationStepIndex);
      if (destinationStepIndex > lastActiveStepIndex) {
        setLastActiveIndex(destinationStepIndex);
      }
    }

    const goToNextStep = () => {
      goToStep(currentStepNameIndex + 1);
    }

    const getStepIndex = (stepName: RegistrationStepNameType) => {
      return steps.indexOf(steps.find(step => step.name === stepName));
    }

    if (!program || !registrationForm || !registrationReceipt) return;
    const steps: RegistrationStepType[] = [];

    steps.push({
      name: 'form',
      label: 'ثبت‌نام در دوره',
      component: <Form onSuccess={() => goToNextStep()} />,
      onClick: () => goToStep(getStepIndex('form'))
    })

    steps.push({
      name: 'personal-profile',
      label: 'تکمیل مشخصات شخصی',
      component: <Profiles type='personal' onSuccess={() => goToNextStep()} />,
      onClick: () => goToStep(getStepIndex('personal-profile')),
    })

    if (program.audience_type === 'Student') {
      steps.push({
        name: 'student-profile',
        label: 'تکمیل مشخصات دانش‌آموزی',
        component: <Profiles type='student' onSuccess={() => goToNextStep()} />,
        onClick: () => goToStep(getStepIndex('student-profile'))
      })
    }

    if (program.audience_type === 'Academic') {
      steps.push({
        name: 'academic-profile',
        label: 'تکمیل مشخصات دانشجویی',
        component: <Profiles type='academic' onSuccess={() => goToNextStep()} />,
        onClick: () => goToStep(getStepIndex('academic-profile'))
      })
    }

    if (registrationForm.accepting_status == 'Manual') {
      steps.push({
        name: 'status',
        label: 'وضعیت ثبت‌نام',
        component: <RegistrationStatus />,
        onClick: () => goToStep(getStepIndex('status')),
      })
    }

    if (program.merchandise) {
      steps.push({
        name: 'payment',
        label: 'پرداخت هزینه',
        component: <Payment />,
        onClick: () => goToStep(getStepIndex('payment')),
      })
    }

    steps.push({
      name: 'program',
      label: 'ورود به دوره',
      component: null,
    })

    if (isFirstRender) {
      if (program.is_user_participating) {
        goToStep(getStepIndex('form') + 1);
      }
      if (['Waiting', 'Rejected'].includes(registrationReceipt.status)) {
        goToStep(getStepIndex('status'));
      }
      if (program?.merchandise && registrationReceipt?.status === 'Accepted') {
        goToStep(getStepIndex('payment'));
      }
      setIsFirstRender(false);
    }

    setSteps(steps);
  }, [program, registrationForm, currentStepNameIndex, lastActiveStepIndex, registrationReceipt]);

  return {
    currentStepNameIndex,
    lastActiveStepIndex,
    steps,
  }
}

export default useRegistrationSteps;