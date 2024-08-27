import {
  Button,
  Grid,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  registerUsersViaCSVAction,
} from 'apps/website-display/redux/slices/programs';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

type RegisterUsersViaExcelInProgramPropsType = {
  registerUsersViaCSV: any;
}

const RegisterUsersViaExcelInProgram: FC<RegisterUsersViaExcelInProgramPropsType> = ({
  registerUsersViaCSV,
}) => {
  const { programSlug } = useParams();
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const { data: program } = useGetProgramQuery({ programSlug });

  const submit = () => {
    registerUsersViaCSV({ registrationFormId: program?.registration_form, file })
  }

  const changeFile = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const clearFile = (e) => {
    e.preventDefault();
    setFile(null);
    fileRef.current.value = null;
  }

  return (
    <Stack spacing={2}>

      <Stack direction='row' spacing={1} alignItems='flex-end'>
        <Typography variant='h2'>
          {'افزودن کاربران از طریق فایل اکسل'}
        </Typography>
        <Typography>
          <Link style={{ textDecoration: 'none' }} target="_blank" download to={"/register-participants-sample.xlsx"}>{'(نمونه فایل)'}</Link>
        </Typography>
      </Stack>

      <Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Stack direction='row' spacing={1}>
              <Button
                component="label"
                htmlFor={"xlsx-info-input"}
                sx={{ whiteSpace: 'nowrap' }}
                variant="contained"
                color="secondary">
                انتخاب فایل
              </Button>
              <input
                ref={fileRef}
                accept=".xlsx"
                id={"xlsx-info-input"}
                style={{ display: 'none' }}
                type="file"
                onChange={changeFile} />
              {file?.name &&
                <Button
                  size="small"
                  variant='outlined'
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                  endIcon={
                    <IconButton size='small' onClick={clearFile}>
                      <ClearIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  }>
                  {file?.name}
                </Button>
              }
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={!file}
              fullWidth
              variant="contained"
              color="primary"
              onClick={submit}>
              {'ارسال'}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Stack >
  );
}

export default connect(null, {
  registerUsersViaCSV: registerUsersViaCSVAction,
})(RegisterUsersViaExcelInProgram);
