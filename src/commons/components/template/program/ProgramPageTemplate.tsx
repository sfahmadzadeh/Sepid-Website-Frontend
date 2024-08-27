import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';

type ProgramPageTemplatePropsType = {
  children: any;
}

const ProgramPageTemplate: FC<ProgramPageTemplatePropsType> = ({
  children,
}) => {
  const { programSlug } = useParams();
  const navigate = useNavigate();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: website } = useGetWebsiteQuery();
  const {
    data: registrationReceipt,
    isSuccess: isGettingRegistrationReceiptSuccess,
    isFetching: isGettingRegistrationReceiptFetching,
  } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });

  useEffect(() => {
    if (isGettingRegistrationReceiptSuccess) {
      if (!isGettingRegistrationReceiptFetching && !registrationReceipt?.is_participating) {
        navigate(`/program/${programSlug}/form/`);
      }
    }
  }, [registrationReceipt])

  if (!registrationReceipt?.is_participating) {
    return null;
  }

  if (!program) {
    return (
      <>loading...</>
    );
  }

  return children;
}

export default ProgramPageTemplate;