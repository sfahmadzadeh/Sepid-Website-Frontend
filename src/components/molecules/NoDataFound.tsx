import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";

type NoDataFoundPropsType = {
  variant?: number;
  message?: string;
}

const NoDataFound: FC<NoDataFoundPropsType> = ({
  variant = 1,
  message = 'موردی وجود ندارد',
}) => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <img width={'100%'} style={{ maxWidth: 400 }} src={process.env.PUBLIC_URL + `/images/no-data-${variant}.jpg`} />
      <Typography variant='h3' textAlign={'center'}>
        {message}
      </Typography>
    </Stack>
  )
}

export default NoDataFound;