import React, { FC, Fragment } from 'react';

import { WidgetModes } from 'components/organisms/Widget';
import Widget from 'components/organisms/Widget';
import EditPaper from './EditPaper';
import { useGetPaperQuery } from 'redux/features/paper/PaperSlice';
import { WidgetType } from 'types/global';

export type GeneralPaperPropsType = {
  mode?: 'general';
  paperId: string;
  widgets_type?: 'contents' | 'problems' | 'all';
}

const GeneralPaper: FC<GeneralPaperPropsType> = ({
  paperId,
  widgets_type = 'all',
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
          key={widget.id}
          paperId={paper?.id}
          mode={WidgetModes.View}
          coveredWithPaper={false} widget={widget} />
      ))}
    </Fragment>
  );
};

export { EditPaper };
export default GeneralPaper;
