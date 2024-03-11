import { Slide, useScrollTrigger } from '@mui/material';
import React, { Fragment } from 'react';

export default function HideOnScroll({ children, disable = false }) {
  const trigger = useScrollTrigger({});
  
  if (disable) {
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
