import {
  Box,
  Dialog,
  IconButton,
  Paper,
  Tooltip,
} from '@mui/material';
import { Brush as BrushIcon } from '@mui/icons-material';
import React, { Fragment, useEffect, useState } from 'react';

import CustomDraggable from 'components/Whiteboard/CustomDraggable';
import Whiteboard from 'components/Whiteboard';
import useWidth from 'utils/UseWidth';

function WhiteboardButton() {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const themeWidth = useWidth();

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  const isDraggable = themeWidth != 'xs' && !isFullScreen;

  return (
    <Fragment>
      <Tooltip title='تخته' arrow>
        <IconButton size={themeWidth == 'xs' ? 'small' : 'medium'} onClick={() => setOpen(!open)}>
          <BrushIcon />
        </IconButton>
      </Tooltip>
      <Dialog disableScrollLock
        maxWidth="lg"
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={!isDraggable}
        hideBackdrop
        disableEnforceFocus
        style={{ pointerEvents: isDraggable ? 'none' : 'auto' }}
        PaperComponent={isDraggable ? CustomDraggable : Paper}>
        {isDraggable &&
          <Box sx={{
            width: '100%',
            height: 20,
            background: '#666',
            cursor: 'move',
          }} />}
        <div className="not-draggable">
          <Whiteboard
            width={isDraggable ? 1000 : width}
            height={isDraggable ? 500 : height}
            handleClose={() => setOpen(false)}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
          />
        </div>
      </Dialog>
    </Fragment>
  );
}

export default WhiteboardButton;
