import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import isNumber from 'commons/utils/validators/isNumber';
import { useInviteMemberMutation } from 'apps/website-display/redux/features/team/InvitationSlice';

type MakeInvitationDialogPropsType = {
  handleClose: any;
  teamId: string;
  open: boolean;
}

const MakeInvitationDialog: FC<MakeInvitationDialogPropsType> = ({
  handleClose,
  teamId,
  open,
}) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [inviteMember, { isSuccess }] = useInviteMemberMutation();

  const sendInvitation = () => {
    if (!phoneNumber) return;
    inviteMember({ teamId, username: phoneNumber });
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      setPhoneNumber('');
    }
  }, [isSuccess])

  return (
    <Dialog disableScrollLock maxWidth="sm" open={open} onClose={handleClose}>
      <DialogContent>
        <Typography gutterBottom>
          {'شماره تلفن فرد مورد نظر را وارد کنید.'}
        </Typography>
        <TextField
          fullWidth
          placeholder='مثال: 09123456789'
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => {
            if (isNumber(e.target.value)) {
              setPhoneNumber(e.target.value);
            }
          }}
          inputProps={{ className: 'ltr-input' }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={sendInvitation}>
          {'ارسال دعوت‌نامه'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MakeInvitationDialog;
