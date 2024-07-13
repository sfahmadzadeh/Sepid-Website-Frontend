import { Button, Stack } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState, FC, Fragment } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import Widget, { WidgetModes } from 'components/organisms/Widget';
import CreateWidgetDialog from 'components/organisms/dialogs/CreateWidgetDialog';
import NoDataFound from 'components/molecules/NoDataFound';
import { useGetPaperQuery } from 'redux/features/paper/PaperSlice';
import { WidgetType } from 'types/global';

type EditPaperPropsType = {
  paperId: string;
  mode?: 'contents' | 'problems' | 'all';
}

const EditPaper: FC<EditPaperPropsType> = ({
  paperId,
  mode = 'all',
}) => {
  const t = useTranslate();
  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState(false);
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

  return (
    <Fragment>
      <Stack spacing={4} justifyContent="center">
        {(widgets && widgets.length === 0) ?
          <NoDataFound variant={4} message={'ویجتی وجود ندارد'} /> :
          <Fragment>
            {widgets?.map((widget, index) => (
              <Widget
                key={widget.id}
                paperId={paperId}
                widget={widget}
                mode={WidgetModes.Edit}
              />
            ))}
          </Fragment>
        }
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => setOpenCreateWidgetDialog(true)}
          startIcon={<AddIcon />}>
          {t('createWidget')}
        </Button>
      </Stack>
      <CreateWidgetDialog
        showProblems={mode === 'problems' || mode === 'all'}
        showContent={mode === 'contents' || mode === 'all'}
        paperId={paperId}
        open={openCreateWidgetDialog}
        handleClose={() => setOpenCreateWidgetDialog(false)}
      />
    </Fragment>
  );
}

export default EditPaper;
