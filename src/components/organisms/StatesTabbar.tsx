import { Button, FormControl, InputLabel, Select, MenuItem, Stack, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';

import CreateStateDialog from './dialogs/CreateStateDialog';

type StatesTabbarPropsType = {
  value: any;
  setValue: any;
  tabs: string[];
}

const StatesTabbar: FC<StatesTabbarPropsType> = ({
  value,
  setValue,
  tabs = [],
}) => {
  const [openCreateStateDialog, setOpenCreateStateDialog] = useState(false);

  return (
    <Fragment>
      <Stack direction={'row'} alignContent={'stretch'} justifyContent={'space-between'}>
        <FormControl fullWidth>
          <InputLabel>مشاهده گام</InputLabel>
          <Select
            sx={{
              borderTopRightRadius: 0,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            value={value}
            label="مشاهده گام"
            onChange={(event) => setValue(event.target.value)}>
            {tabs.map((tab, index) =>
              <MenuItem key={index} value={index}>{tab}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Button
          sx={{
            paddingX: 2,
            boxShadow: 0,
            whiteSpace: 'nowrap',
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 0,
          }}
          size="small"
          color="primary"
          onClick={() => setOpenCreateStateDialog(true)}
          variant="contained">
          <Typography variant='h6'>
            {'ایجاد گام جدید'}
          </Typography>
        </Button>
      </Stack>
      <CreateStateDialog
        open={openCreateStateDialog}
        handleClose={() => setOpenCreateStateDialog(false)}
      />
    </Fragment>
  );
}

export default StatesTabbar;