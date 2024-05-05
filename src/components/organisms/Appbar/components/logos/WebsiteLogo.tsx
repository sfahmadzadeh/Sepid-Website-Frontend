import React from "react";
import { Button, Stack, Typography } from "@mui/material";
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
    <Button sx={{ padding: 0, paddingX: 1 }} disableRipple component={Link} to='/programs/'>
      <Stack direction='row' alignItems={'center'} justifyContent={'center'} sx={{ userSelect: 'none' }} spacing={1}>
        <img alt="website-logo" src={website.logo.desktop_image} width={50} />
        <Typography fontFamily={"Lalezar"} sx={{ color: "#3498DB", fontSize: { xs: 36, md: 40 }, fontWeight: 500 }}>
          {website.display_name}
        </Typography>
      </Stack>
    </Button>
  );
}

export default WebsiteLogo;