import React, { FC, Fragment } from 'react';

import { WidgetModes } from 'components/organisms/Widget';
import Widget from 'components/organisms/Widget';
import { useGetPaperQuery } from 'redux/features/paper/PaperSlice';
import { AnswerType } from 'types/models';

export type AnswerSheetPaperPropsType = {
  mode?: 'answer_sheet';
  paperId: string;
  answers: AnswerType[];
}

const AnswerSheetPaper: FC<AnswerSheetPaperPropsType> = ({
  paperId,
  answers,
}) => {
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !paperId });

  return (
    <Fragment>
      {paper?.widgets?.map((widget) => (
        <Widget
          submittedAnswer={answers?.find(answer => answer.problem === widget.id)}
          key={widget.id}
          paperId={paper?.id}
          mode={WidgetModes.Review}
          coveredWithPaper={false}
          widget={widget} />
      ))}
    </Fragment>
  );
};

export default AnswerSheetPaper;
