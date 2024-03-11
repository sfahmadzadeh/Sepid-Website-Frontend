import { Typography } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

const PartyProfile = ({ }) => {
  const { partyName } = useParams();

  return (
    <Fragment>
      <Typography>
        {partyName}
      </Typography>
    </Fragment>
  )
}

export default PartyProfile;