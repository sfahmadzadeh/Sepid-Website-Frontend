import { Button, Stack, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import React, { useState, FC, Fragment } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import Widget, { WidgetModes } from 'components/organisms/Widget';
import CreateWidgetDialog from 'components/organisms/dialogs/CreateWidgetDialog';
import NoDataFound from 'components/molecules/NoDataFound';

type EditPaperPropsType = {
  widgets: any[];
  paperId: number | null;
  mode?: 'contents' | 'problems' | 'all';
  collectWidgetDataToolkit?: any;
}

const EditPaper: FC<EditPaperPropsType> = ({
  widgets,
  paperId,
  mode = 'all',
  collectWidgetDataToolkit,
}) => {
  const t = useTranslate();
  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState(false);

  if (!paperId && !collectWidgetDataToolkit) {
    throw Error('Invalid Props In Editing Paper');
  }

  return (
    <Fragment>
      <Stack spacing={4} justifyContent="center">
        {(widgets && widgets.length === 0) ?
          <NoDataFound variant={4} message={'ویجتی وجود ندارد'} /> :
          <Fragment>
            {widgets?.map((widget, index) => (
              <Widget
                key={index}
                paperId={paperId}
                widget={widget}
                mode={WidgetModes.Edit}
                collectWidgetDataToolkit={collectWidgetDataToolkit}
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
        collectWidgetDataToolkit={collectWidgetDataToolkit}
      />
    </Fragment>
  );
}

export default EditPaper;
