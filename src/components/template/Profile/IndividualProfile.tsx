import React from "react";
import { useParams } from "react-router-dom";

const IndividualProfile = () => {
  const { partyId } = useParams();

  return (
    <>
      individual profile
    </>
  )
}

export default IndividualProfile