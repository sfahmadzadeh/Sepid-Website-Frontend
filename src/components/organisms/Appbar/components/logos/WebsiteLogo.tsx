import React from "react";
import { IconButton } from "@mui/material";
import { useGetWebsiteQuery } from "redux/features/WebsiteSlice";
import LogoSkeleton from "./LogoSkeleton";
import { Link } from "react-router-dom";

const WebsiteLogo = () => {

  const {
    data: website,
    isSuccess,
  } = useGetWebsiteQuery();

  if (!isSuccess) {
    return <LogoSkeleton />
  }

  return (
    // todo: change /programs/ to /dashboard/
    <IconButton sx={{ padding: 0, paddingX: 1, userSelect: 'none' }} disableRipple component={Link} to='/programs/'>
      <img alt="website-logo" unselectable="on" src={website.logo.desktop_image} style={{ maxWidth: 200, maxHeight: 50 }} />
    </IconButton>
  );
}

export default WebsiteLogo;