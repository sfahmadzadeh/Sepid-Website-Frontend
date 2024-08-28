import { css } from 'styled-components';

// Styles for the html and body elements
const bodyStyles = css`
  overflow: hidden;
  margin: 0;
  height: 100%;
  height: min-content;
  height: fit-content;
  height: -moz-fit-content;
`;

// Styles for print layout
const printStyles = css`
  @page {
    size: auto;
    margin: 0mm;
  }
`;

// Combine and export all styles
export const frameStyles = css`
  html, body {
    ${bodyStyles}
  }

  ${printStyles}
`;