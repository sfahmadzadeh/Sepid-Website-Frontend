import {
  Button,
  Stack,
  TextField,
} from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetWebsiteQuery } from 'redux/features/WebsiteSlice';
import {
  getVerificationCodeAction,
} from 'redux/slices/account';
import isNumber from 'utils/validators/isNumber';
import isPhoneNumber from 'utils/validators/isPhoneNumber';

type VerifyPhoneNumberPropsType = {
  getVerificationCode: any;
  data: {
    phoneNumber: string;
    verificationCode: string;
  };
  setData: any;
  verifyType: 'on-create-user-account' | 'on-change-phone-number';
}

type VerificationCodeType = 'create-user-account' | 'change-user-phone-number';

const VerifyPhoneNumber: FC<VerifyPhoneNumberPropsType> = ({
  getVerificationCode,
  data,
  setData,
  verifyType,
}) => {
  const [isButtonDisabled, setIsButtonDisable] = useState(false);
  const { data: website } = useGetWebsiteQuery();

  const handleGettingVerificationCode = () => {
    if (!isPhoneNumber(data.phoneNumber)) {
      toast.error('شماره تلفن وارد‌شده معتبر نیست');
      return;
    }
    if (!website) {
      toast.error('نام آکادمی معتبر نیست.');
      return;
    }
    setIsButtonDisable(true);
    getVerificationCode({
      phoneNumber: data.phoneNumber,
      codeType: verifyType === 'on-create-user-account' ? 'create-user-account' : 'change-user-phone-number',
      partyDisplayName: website.display_name,
    }).then(() => {
      setTimeout(() => {
        setIsButtonDisable(false);
      }, 60000);
    });
  };

  return (
    <Stack spacing={1} paddingTop={1}>
      <TextField
        variant="outlined"
        fullWidth
        onChange={(e) => {
          if (isNumber(e.target.value)) {
            setData(e);
          }
        }}
        value={data.phoneNumber}
        name="phoneNumber"
        label="شماره تلفن همراه"
        placeholder='09...'
        inputProps={{ className: 'ltr-input' }}
        type="tel"
        inputMode='tel'
      />

      <Stack direction='row' spacing={1}>
        <TextField
          variant="outlined"
          fullWidth
          onChange={(e) => {
            if (isNumber(e.target.value)) {
              setData(e);
            }
          }}
          value={data.verificationCode}
          name="verificationCode"
          label="کد تایید پیامک‌شده"
          inputProps={{ className: 'ltr-input' }}
          autoComplete='false'
          type='number'
          inputMode='numeric'
        />
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{
            width: '40%',
            whiteSpace: 'nowrap',
          }}
          onClick={handleGettingVerificationCode}
          disabled={isButtonDisabled}>
          {isButtonDisabled ? '۱ دقیقه صبر کن' : 'دریافت کد'}
        </Button>
      </Stack>
    </Stack>
  );
};

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  getVerificationCode: getVerificationCodeAction,
})(VerifyPhoneNumber);
