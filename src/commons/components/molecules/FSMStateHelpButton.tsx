import React, { FC, Fragment, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import HelpDialog from 'commons/components/organisms/dialogs/FSMStateHelpDialog';


type FSMStateHelpButtonPropsType = {
  hints: any[]
}

const FSMStateHelpButton: FC<FSMStateHelpButtonPropsType> = ({ hints }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isHover, setIsHover] = useState(false);

  if (hints.length === 0) return null;

  return (
    <Fragment>
      <Tooltip arrow title='راهنمایی'>
        <IconButton disableRipple onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)} onClick={() => setOpenDialog(true)}>
          <img width={40} src={process.env.PUBLIC_URL + ((isHover || openDialog) ? '/images/idea-on.png' : '/images/idea-off.png')} />
        </IconButton>
      </Tooltip>
      <HelpDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        helps={hints}
      />
    </Fragment>
  );
};

export default FSMStateHelpButton;
