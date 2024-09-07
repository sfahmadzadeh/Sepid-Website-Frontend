import React, { FC, Fragment } from 'react';

import { WidgetModes } from 'commons/components/organisms/Widget';
import Widget from 'commons/components/organisms/Widget';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { AnswerType } from 'commons/types/models';

export type AnswerSheetPaperPropsType = {
  mode: 'answer_sheet';
  paperId: string;
  answers: AnswerType[];
}

const AnswerSheetPaper: FC<AnswerSheetPaperPropsType> = ({
  paperId,
  answers,
}) => {
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !paperId });
  const visibleWidgets = paper?.widgets.filter(widget => !widget.is_hidden)

  return (
    <Fragment>
      {visibleWidgets?.map((widget) => (
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
