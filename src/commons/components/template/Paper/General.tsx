import React, { FC, Fragment } from 'react';

import { WidgetModes } from 'commons/components/organisms/Widget';
import Widget from 'commons/components/organisms/Widget';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { WidgetType } from 'commons/types/widgets/widget';

export type GeneralPaperPropsType = {
  mode: 'general';
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
  const visibleWidgets = widgets.filter(widget => !widget.is_hidden)


  return (
    <Fragment>
      {visibleWidgets.map((widget) => (
        <Widget
          key={widget.id}
          paperId={paper?.id}
          mode={WidgetModes.View}
          coveredWithPaper={false} widget={widget} />
      ))}
    </Fragment>
  );
};

export default GeneralPaper;
