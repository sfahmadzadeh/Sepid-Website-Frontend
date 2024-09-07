import {
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import { useAddAdminToProgramMutation, useGetProgramAdminsQuery, useRemoveAdminFromProgramMutation } from 'apps/website-display/redux/features/program/ProgramAdminsSlice';
import SimpleTable from 'commons/components/organisms/tables/SimpleTable';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';


type AdminsTabPropsType = {}

const AdminTab: FC<AdminsTabPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [username, setUsername] = useState<string>('');
  const [addAdminToProgram, addAdminToProgramResult] = useAddAdminToProgramMutation();
  const [removeAdminFromProgram, _] = useRemoveAdminFromProgramMutation();
  const { data: programAdmins } = useGetProgramAdminsQuery({ programSlug }, { skip: !Boolean(program) });

  const addAdmin = () => {
    addAdminToProgram({ programSlug, username })
  };

  useEffect(() => {
    if (addAdminToProgramResult.isSuccess) {
      setUsername('');
    }
  }, [addAdminToProgramResult])

  const removeAdmin = (username) => {
    removeAdminFromProgram({ programSlug, username })
  }

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>

        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant='h2'>
            {'مدیران دوره'}
          </Typography>
          <Tooltip title='مدیر دوره کسی است که به تمام تنظیمات دوره دسترسی دارد. او هم‌چنین می‌تواند کارگاه‌های دوره را ویرایش کند.'>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={username}
                size="small"
                fullWidth
                variant="outlined"
                label="نام کاربری"
                name="username"
                inputProps={{ className: 'ltr-input' }}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={!username}
                fullWidth
                variant="contained"
                color="primary"
                onClick={addAdmin}>
                {'افزودن مدیر جدید'}
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Stack>

      <Divider />

      <SimpleTable
        headers={[
          { name: 'first_name', label: 'نام' },
          { name: 'last_name', label: 'نام خانوادگی' },
          { name: 'phone_number', label: 'شماره تماس' },
          { name: 'email', label: 'ایمیل' },
          { name: 'activities', label: 'عملیات' },
        ]}
        rows={programAdmins?.map(programAdmin => ({
          ...programAdmin,
          activities:
            <IconButton size='small'
              onClick={() => removeAdmin(programAdmin.username)}>
              <ClearIcon />
            </IconButton>
        }))}
      />
    </Stack>
  );
}

export default AdminTab;
