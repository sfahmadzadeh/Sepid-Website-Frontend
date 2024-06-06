import { Box } from '@mui/material';
import React, { FC, Fragment } from 'react';

import { WidgetModes } from 'components/organisms/Widget';
import Widget from 'components/organisms/Widget';
import EditPaper from './EditPaper';
import { useGetPaperQuery } from 'redux/features/paper/PaperSlice';
import { WidgetType } from 'types/global';

type PaperPropsType = {
  paperId: string;
  mode?: 'contents' | 'problems' | 'all';

}

const Paper: FC<PaperPropsType> = ({
  paperId,
  mode = 'all',
}) => {
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !paperId });

  let widgets: WidgetType[];
  if (mode === 'all') {
    widgets = paper?.widgets;
  } else if (mode === 'contents') {
    widgets = paper?.widgets.filter(
      (widget) => !widget.widget_type.includes('Problem')
    );
  } else if (mode === 'problems') {
    widgets = paper?.widgets.filter(
      (widget) => widget.widget_type.includes('Problem')
    );
  }
  widgets = widgets || [];

  return (
    <Fragment>
      {widgets.map((widget) => (
        <Widget key={widget.id} paperId={paper?.id} mode={WidgetModes.View} coveredWithPaper={false} widget={widget} />
      ))}
    </Fragment>
  );
};

export { EditPaper };
export default Paper;
