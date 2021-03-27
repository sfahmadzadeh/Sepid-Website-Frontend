import { Button, SvgIcon } from '@material-ui/core';
import React, { useState } from 'react';

import ScoreHistoryDialog from '../../../Dialog/ScoreHistoryDialog/ScoreHistoryDialog';

const ScoreIcon = () => (
  <SvgIcon>
    <path d="M 14.8125 1.40625 L 13.988281 1.40625 C 13.699219 0.585938 12.917969 0 12 0 C 11.082031 0 10.300781 0.585938 10.011719 1.40625 L 9.1875 1.40625 C 8.023438 1.40625 7.078125 2.351562 7.078125 3.515625 C 7.078125 3.902344 7.394531 4.21875 7.78125 4.21875 L 16.21875 4.21875 C 16.605469 4.21875 16.921875 3.902344 16.921875 3.515625 C 16.921875 2.351562 15.976562 1.40625 14.8125 1.40625 Z M 14.8125 1.40625 " />
    <path d="M 19.03125 2.8125 L 18.257812 2.8125 C 18.304688 3.039062 18.328125 3.273438 18.328125 3.515625 C 18.328125 4.679688 17.382812 5.625 16.21875 5.625 L 7.78125 5.625 C 6.617188 5.625 5.671875 4.679688 5.671875 3.515625 C 5.671875 3.273438 5.695312 3.039062 5.742188 2.8125 L 4.96875 2.8125 C 3.804688 2.8125 2.859375 3.757812 2.859375 4.921875 L 2.859375 21.890625 C 2.859375 23.054688 3.804688 24 4.96875 24 L 19.03125 24 C 20.195312 24 21.140625 23.054688 21.140625 21.890625 L 21.140625 4.921875 C 21.140625 3.757812 20.195312 2.8125 19.03125 2.8125 Z M 9.890625 19.6875 L 7.078125 19.6875 C 6.691406 19.6875 6.375 19.371094 6.375 18.984375 C 6.375 18.597656 6.691406 18.28125 7.078125 18.28125 L 9.890625 18.28125 C 10.277344 18.28125 10.59375 18.597656 10.59375 18.984375 C 10.59375 19.371094 10.277344 19.6875 9.890625 19.6875 Z M 9.890625 14.765625 L 7.078125 14.765625 C 6.691406 14.765625 6.375 14.449219 6.375 14.0625 C 6.375 13.675781 6.691406 13.359375 7.078125 13.359375 L 9.890625 13.359375 C 10.277344 13.359375 10.59375 13.675781 10.59375 14.0625 C 10.59375 14.449219 10.277344 14.765625 9.890625 14.765625 Z M 9.890625 9.84375 L 7.078125 9.84375 C 6.691406 9.84375 6.375 9.527344 6.375 9.140625 C 6.375 8.753906 6.691406 8.4375 7.078125 8.4375 L 9.890625 8.4375 C 10.277344 8.4375 10.59375 8.753906 10.59375 9.140625 C 10.59375 9.527344 10.277344 9.84375 9.890625 9.84375 Z M 16.714844 19.894531 C 16.992188 20.167969 16.992188 20.613281 16.714844 20.886719 C 16.578125 21.023438 16.398438 21.09375 16.21875 21.09375 C 16.039062 21.09375 15.859375 21.023438 15.722656 20.886719 L 14.8125 19.980469 L 13.902344 20.886719 C 13.765625 21.023438 13.585938 21.09375 13.40625 21.09375 C 13.226562 21.09375 13.046875 21.023438 12.910156 20.886719 C 12.632812 20.613281 12.632812 20.167969 12.910156 19.894531 L 13.816406 18.984375 L 12.910156 18.074219 C 12.632812 17.800781 12.632812 17.355469 12.910156 17.082031 C 13.183594 16.804688 13.628906 16.804688 13.902344 17.082031 L 14.8125 17.988281 L 15.722656 17.082031 C 15.996094 16.804688 16.441406 16.804688 16.714844 17.082031 C 16.992188 17.355469 16.992188 17.800781 16.714844 18.074219 L 15.808594 18.984375 Z M 17.417969 13.152344 L 15.308594 15.261719 C 15.171875 15.398438 14.992188 15.46875 14.8125 15.46875 C 14.632812 15.46875 14.453125 15.398438 14.316406 15.261719 L 12.910156 13.855469 C 12.632812 13.582031 12.632812 13.136719 12.910156 12.863281 C 13.183594 12.585938 13.628906 12.585938 13.902344 12.863281 L 14.8125 13.769531 L 16.425781 12.160156 C 16.699219 11.882812 17.144531 11.882812 17.417969 12.160156 C 17.695312 12.433594 17.695312 12.878906 17.417969 13.152344 Z M 17.417969 8.933594 L 15.308594 11.042969 C 15.171875 11.179688 14.992188 11.25 14.8125 11.25 C 14.632812 11.25 14.453125 11.179688 14.316406 11.042969 L 12.910156 9.636719 C 12.632812 9.363281 12.632812 8.917969 12.910156 8.644531 C 13.183594 8.367188 13.628906 8.367188 13.902344 8.644531 L 14.8125 9.550781 L 16.425781 7.941406 C 16.699219 7.664062 17.144531 7.664062 17.417969 7.941406 C 17.695312 8.214844 17.695312 8.660156 17.417969 8.933594 Z M 17.417969 8.933594 " />
  </SvgIcon>
);

const ScoreHistoryButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ScoreIcon />}
        onClick={() => setOpen(true)}>
        کارنامه
      </Button>
      <ScoreHistoryDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default ScoreHistoryButton;
