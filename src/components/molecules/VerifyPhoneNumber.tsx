import {
  Button,
  Stack,
  TextField,
} from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetPartyQuery } from 'redux/features/PartySlice';
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
}

const VerifyPhoneNumber: FC<VerifyPhoneNumberPropsType> = ({
  getVerificationCode,
  data,
  setData,
}) => {
  const [isButtonDisabled, setIsButtonDisable] = useState(false);
  const { data: party } = useGetPartyQuery();

  const handleGettingVerificationCode = () => {
    if (!isPhoneNumber(data.phoneNumber)) {
      toast.error('شماره تلفن وارد‌شده معتبر نیست');
      return;
    }
    if (!party) {
      toast.error('نام شخص یا شرکت معتبر نیست.');
      return;
    }
    setIsButtonDisable(true);
    getVerificationCode({
      phoneNumber: data.phoneNumber,
      codeType: 'create-user-account',
      partyDisplayName: party.display_name,
    }).then(() => {
      setTimeout(() => {
        setIsButtonDisable(false);
      }, 60000);
    });
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  getVerificationCode: getVerificationCodeAction,
})(VerifyPhoneNumber);
