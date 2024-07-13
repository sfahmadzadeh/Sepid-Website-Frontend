import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import IframeEditWidget from './edit';
import { useWindowSize } from 'utils/useWindowSIze';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

export { IframeEditWidget };

const IframeWidget = ({ link = '' }) => {
  const [windowWidth, _] = useWindowSize();
  const t = useTranslate();
  const iframeRef = useRef(null);
  const [iFrameHeight, setIFrameHeight] = useState(300);
  const ratio = 9 / 16;

  useEffect(() => {
    if (iframeRef.current?.scrollWidth) {
      setIFrameHeight(ratio * iframeRef.current?.scrollWidth);
    }
  }, [iframeRef.current, windowWidth])

  const handleFullScreen = () => {
    if (iframeRef.current.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    } else if (iframeRef.current.webkitRequestFullscreen) { /* Safari */
      iframeRef.current.webkitRequestFullscreen();
    } else if (iframeRef.current.msRequestFullscreen) { /* IE11 */
      iframeRef.current.msRequestFullscreen();
    }
  }

  return (
    <Box position={'relative'}>
      <iframe
        loading='eager'
        title={t('game')}
        src={link}
        ref={iframeRef}
        height={iFrameHeight}
        allowFullScreen
        style={{
          zIndex: 0,
          width: '100%',
          border: 'none',
        }}
      />
      <Tooltip arrow title={'حالت تمام صفحه'}>
        <IconButton onClick={handleFullScreen} sx={{ position: 'absolute', left: 0, bottom: 2, zIndex: 1 }}>
          <FullscreenIcon fontSize='large' />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default IframeWidget;
