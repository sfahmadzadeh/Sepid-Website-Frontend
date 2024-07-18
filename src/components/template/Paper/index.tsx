import React, { FC } from 'react';

import EditPaper from './EditPaper';
import GeneralPaper, { GeneralPaperPropsType } from './General';
import FormPaper, { FormPaperPropsType } from './Form';

type PaperPropsType = GeneralPaperPropsType | FormPaperPropsType;

const Paper: FC<PaperPropsType> = (props) => {
  if (props.mode === 'general') {
    return <GeneralPaper {...props} />
  }
  if (props.mode === 'form') {
    return <FormPaper  {...props} />
  }
};

export { EditPaper };
export default Paper;