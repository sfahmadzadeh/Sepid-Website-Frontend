import React, { FC, Fragment } from 'react';

import { WidgetModes } from 'components/organisms/Widget';
import Widget from 'components/organisms/Widget';
import { useGetPaperQuery } from 'redux/features/paper/PaperSlice';
import { AnswerType } from 'types/models';
import { GetAnswerCollectorType } from 'components/hooks/useCollectWidgetsAnswers';
import { WidgetType } from 'types/widgets/widget';

export type FormPaperPropsType = {
  mode: 'form';
  paperId: string;
  widgets_type?: 'contents' | 'problems' | 'all';
  answers: AnswerType[];
  getAnswerCollector: GetAnswerCollectorType;
}

const FormPaper: FC<FormPaperPropsType> = ({
  paperId,
  widgets_type = 'all',
  answers,
  getAnswerCollector,
}) => {
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !paperId });

  let widgets: WidgetType[];
  if (widgets_type === 'all') {
    widgets = paper?.widgets;
  } else if (widgets_type === 'contents') {
    widgets = paper?.widgets.filter(
      (widget) => !widget.widget_type.includes('Problem')
    );
  } else if (widgets_type === 'problems') {
    widgets = paper?.widgets.filter(
      (widget) => widget.widget_type.includes('Problem')
    );
  }
  widgets = widgets || [];

  return (
    <Fragment>
      {widgets.map((widget) => (
        <Widget
          collectAnswer={getAnswerCollector({ widgetId: widget.id, widgetType: widget.widget_type })}
          key={widget.id}
          paperId={paper?.id}
          mode={WidgetModes.InForm}
          coveredWithPaper={false} widget={widget} />
      ))}
    </Fragment>
  );
};

export default FormPaper;
