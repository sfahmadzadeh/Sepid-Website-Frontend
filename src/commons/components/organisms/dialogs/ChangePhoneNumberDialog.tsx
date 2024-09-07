import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import VerifyPhoneNumber from 'commons/components/molecules/VerifyPhoneNumber';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useChangePhoneNumberMutation } from 'apps/website-display/redux/features/user/UserSlice';

type ChangePhoneNumberDialogPropsType = {
  open: boolean;
  handleClose: any;
}

const ChangePhoneNumberDialog: FC<ChangePhoneNumberDialogPropsType> = ({
  open,
  handleClose,
}) => {
  const initialData = {
    phoneNumber: '',
    verificationCode: '',
  }
  const [data, _setData] = useState(initialData);

  const setData = (event) => {
    _setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const [loginWithGoogle, result] = useChangePhoneNumberMutation();

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('شماره تلفن همراه با موفقیت تغییر کرد.')
      _setData(initialData);
      handleClose();
    }
  }, [result])

  const onClick = () => {
    loginWithGoogle({ phone_number: data.phoneNumber, code: data.verificationCode });
  }

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>{'تغییر شماره تلفن همراه'}</DialogTitle>
      <DialogContent sx={{ paddingTop: '8px !important' }}>
        <VerifyPhoneNumber
          verifyType='on-change-phone-number'
          data={data}
          setData={setData}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={onClick}
          disabled={!data.phoneNumber || !data.verificationCode}>
          {'ثبت'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangePhoneNumberDialog;
