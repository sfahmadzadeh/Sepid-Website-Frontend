import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
      .MuiFormControlLabel-root {
        // Your global styles here
        margin: 0px !important;
        padding-left: 8px;
      }
    `}
    />
  )
};

export default GlobalStyles;