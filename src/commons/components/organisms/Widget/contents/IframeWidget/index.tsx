import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import IframeEditWidget from './edit';
import { useWindowSize } from 'commons/utils/useWindowSIze';
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
    const iframe = iframeRef.current;
    if (!iframe) {
      console.error("Iframe reference is invalid.");
      return;
    }

    const enterFullscreen = (element: HTMLElement) => {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) { // Safari
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).msRequestFullscreen) { // IE11
        (element as any).msRequestFullscreen();
      }
    };

    const exitFullscreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) { // Safari
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) { // IE11
        (document as any).msExitFullscreen();
      }
    };

    const isFullscreen = () =>
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement;

    if (!isFullscreen()) {
      enterFullscreen(iframe);
    } else {
      exitFullscreen();
    }
  };

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