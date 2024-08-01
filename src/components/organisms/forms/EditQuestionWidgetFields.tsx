import {
  FormControlLabel,
  Switch,
} from '@mui/material';
import React, { FC, Fragment } from 'react';
import { QuestionWidgetType } from 'types/widgets/QuestionWidget';

type EditQuestionWidgetFieldsPropsType = {
  fields: Partial<QuestionWidgetType>;
  setFields: (fields: Partial<QuestionWidgetType>) => void;
}

const EditQuestionWidgetFields: FC<EditQuestionWidgetFieldsPropsType> = ({
  fields,
  setFields,
}) => {

  return (
    <Fragment>
      <FormControlLabel
        sx={{ paddingTop: 2 }}
        name='is_required'
        checked={fields.is_required}
        onChange={() => setFields({
          is_required: !fields.is_required,
        })}
        control={<Switch color="primary" />}
        label="پاسخ به سوال اجباری باشد"
        labelPlacement='start' />
    </Fragment>
  );
}

export default EditQuestionWidgetFields;
