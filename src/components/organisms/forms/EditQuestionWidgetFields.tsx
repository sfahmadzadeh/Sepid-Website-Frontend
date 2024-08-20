import {
  FormControlLabel,
  Stack,
  Switch,
} from '@mui/material';
import React, { FC } from 'react';
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
    <Stack alignItems={'start'}>
      <FormControlLabel
        name='is_required'
        checked={fields.is_required}
        onChange={() => {
          const isRequiredNewValue = !fields.is_required;
          setFields({
            ...fields,
            is_required: isRequiredNewValue,
            is_hidden: isRequiredNewValue ? false : fields.is_hidden,
          })
        }}
        control={<Switch color="primary" />}
        label="پاسخ به سوال اجباری باشد"
        labelPlacement='start' />
      <FormControlLabel
        name='is_hidden'
        checked={fields.is_hidden}
        onChange={() => {
          const isHiddenNewValue = !fields.is_hidden;
          setFields({
            ...fields,
            is_hidden: isHiddenNewValue,
            is_required: isHiddenNewValue ? false : fields.is_required,
          })
        }}
        control={<Switch color="primary" />}
        label="پنهان‌کردن ویجت"
        labelPlacement='start' />
    </Stack>
  );
}

export default EditQuestionWidgetFields;
