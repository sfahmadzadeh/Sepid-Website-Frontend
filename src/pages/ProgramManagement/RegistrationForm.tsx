import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { EditPaper } from 'components/template/Paper';
import { getRegistrationFormAction } from 'redux/slices/programs';
import { Divider, Stack, Typography } from '@mui/material';

type RegistrationFormPropsType = {
  registrationFormId: any;
  getRegistrationForm: any;
  papers: any[];
}

const RegistrationForm: FC<RegistrationFormPropsType> = ({
  registrationFormId,
  getRegistrationForm,
  papers,
}) => {

  useEffect(() => {
    getRegistrationForm({ registrationFormId });
  }, []);

  const registrationForm = papers[registrationFormId];
  if (!registrationForm) {
    return null;
  }

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'تنظیمات ثبت‌نام'}
        </Typography>
        {/* دکمه‌های سوالات متداول + راهنمای سایت + اپ‌بار و هدر و اوپن‌گراف سایت */}
        <Typography>
          {'todo'}
        </Typography>
      </Stack>

      <Divider />

      <Stack padding={2} spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'فرم ثبت‌نام'}
        </Typography>
        <EditPaper
          widgets={registrationForm.widgets}
          paperId={registrationFormId}
        />
      </Stack>
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  papers: state.paper.papers,
});

export default connect(mapStateToProps, {
  getRegistrationForm: getRegistrationFormAction,
})(RegistrationForm);
