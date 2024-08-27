import React, { FC } from 'react';
import moment, { Moment } from 'moment-jalaali';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import formatMomentWithOffset from 'commons/utils/FormatMomentWithOffset';

type JalaliDataTimePickerPropsType = {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

const JalaliDataTimePicker: FC<JalaliDataTimePickerPropsType> = ({
  setValue,
  value,
  label,
}) => {
  moment.loadPersian({ dialect: 'persian-modern' });

  return (
    <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
      <DateTimePicker
        views={['year', 'month', 'day', 'hours', 'minutes']}
        label={label}
        value={moment(value)}
        onChange={(newValue: Moment) => setValue(formatMomentWithOffset(newValue))}
        sx={{ width: '100%' }}
      />
    </LocalizationProvider>
  );
};

export default JalaliDataTimePicker;
