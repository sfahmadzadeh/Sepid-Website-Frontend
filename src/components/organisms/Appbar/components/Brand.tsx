import React from "react";
import { Stack, Typography } from "@mui/material";
import { useGetWebsiteQuery } from "redux/features/WebsiteSlice";
import LogoSkeleton from "./LogoSkeleton";

const Brand = () => {

  const {
    data: website,
    isSuccess,
  } = useGetWebsiteQuery();

  if (!isSuccess) {
    return <LogoSkeleton />
  }

  return (
    <Stack direction='row' alignItems={'center'} justifyContent={'center'} sx={{ userSelect: 'none' }} spacing={1}>
      <img alt="academy-logo" src={website.logo.desktop_image} width={50} />
      <Typography fontFamily={"Lalezar"} sx={{ color: "#3498DB", fontSize: { xs: 36, md: 40 }, fontWeight: 500 }}>
        {website.display_name}
      </Typography>
    </Stack>
  );
}

export default Brand;