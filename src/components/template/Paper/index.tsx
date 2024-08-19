import React, { FC } from 'react';

import EditPaper from './EditPaper';
import GeneralPaper, { GeneralPaperPropsType } from './General';
import FormPaper, { FormPaperPropsType } from './Form';
import AnswerSheetPaper, { AnswerSheetPaperPropsType } from './AnswerSheet';

type PaperPropsType = GeneralPaperPropsType | FormPaperPropsType | AnswerSheetPaperPropsType;

const Paper: FC<PaperPropsType> = (props) => {
  if (props.mode === 'general') {
    return <GeneralPaper {...props} />
  }
  if (props.mode === 'form') {
    return <FormPaper {...props} />
  }
  if (props.mode === 'answer_sheet') {
    return <AnswerSheetPaper {...props} />
  }
  // todo: add FSM state here
};

export { EditPaper };
export default Paper;