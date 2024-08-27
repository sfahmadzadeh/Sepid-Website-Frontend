import React, { FC } from 'react';

import { useGetReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import Paper from './Paper';
import { useGetAnswerSheetAnswersQuery } from 'apps/website-display/redux/features/responses/answers/AnswerSheetSlice';
import { Typography } from '@mui/material';
import NoDataFound from 'commons/components/molecules/NoDataFound';

type AnswerSheetPaperPropsType = {
  answerSheetId: string;
}

const AnswerSheet: FC<AnswerSheetPaperPropsType> = ({
  answerSheetId,
}) => {
  const { data: answerSheet, isError, isSuccess } = useGetReceiptQuery({ receiptId: answerSheetId });
  const { data: answers } = useGetAnswerSheetAnswersQuery({ answerSheetId });

  return (
    <Paper mode='answer_sheet' paperId={answerSheet?.form} answers={answers} />
  );
};

export default AnswerSheet;
