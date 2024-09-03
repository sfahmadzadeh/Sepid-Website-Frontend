import React, { FC, Fragment, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure';
import {
  IconButton
} from "@mui/material";
import { useRespondInvitationMutation } from 'apps/website-display/redux/features/team/InvitationSlice';

type RespondInvitationPropsType = {
  invitationId: string;
}

const RespondInvitation: FC<RespondInvitationPropsType> = ({
  invitationId,
}) => {
  const [acceptedInvitationId, setAcceptedInvitationId] = useState<string>(null);
  const [rejectedInvitationId, setRejectedInvitationId] = useState<string>(null);
  const [respondInvitation, result] = useRespondInvitationMutation();

  return (
    <Fragment>
      <IconButton
        size="small"
        onClick={() => {
          setAcceptedInvitationId(invitationId);
        }}>
        <CheckCircleIcon />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => {
          setRejectedInvitationId(invitationId);
        }}>
        <CancelIcon />
      </IconButton>
      <AreYouSure
        open={!!acceptedInvitationId}
        handleClose={() => setAcceptedInvitationId(null)}
        callBackFunction={() =>
          respondInvitation({
            invitationId,
            status: "Accepted",
          })
        }
      />
      <AreYouSure
        open={!!rejectedInvitationId}
        handleClose={() => setRejectedInvitationId(null)}
        callBackFunction={() =>
          respondInvitation({
            invitationId,
            status: "Rejected",
          })
        }
      />
    </Fragment>
  );
}

export default RespondInvitation;