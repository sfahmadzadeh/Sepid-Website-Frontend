import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { StatePageContext } from 'pages/FSM';
import { requestMentorAction } from 'redux/slices/currentState';
import useWidth from 'utils/UseWidth';
import { toast } from 'react-toastify';


function MentorButton({ callMentor }) {
  const t = useTranslate();
  const { playerId, teamId, fsmId } = useContext(StatePageContext);
  const [isEnable, setEnable] = useState(true);
  const width = useWidth();

  return (
    <Button
      size={'small'}
      variant="contained"
      color="primary"
      disabled={!isEnable}
      sx={{ fontSize: width == 'xs' ? 12 : 14 }}
      onClick={() => {
        callMentor({ playerId, teamId, fsmId: +fsmId })
        toast.success('درخواست شما با موفقیت ثبت شد.')
        setEnable(false);
        setTimeout(() => {
          setEnable(true);
        }, 60000)
      }}>
      {isEnable ? t('callMentor') : 'یک دقیقه صبر کنید'}
    </Button>
  );
}

export default connect(null, { callMentor: requestMentorAction })(MentorButton);
