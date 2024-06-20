import React from 'react';

import TinyPreview from 'components/organisms/TinyMCE/ReactTiny/Preview';
import TextEditWidget from './edit';

export { TextEditWidget };

const TextWidget = ({ text }) => {
  return (
    <TinyPreview
      frameProps={{
        frameBorder: '0',
        scrolling: 'no',
        width: '100%',
      }}
      content={text}
    />
  );
};

export default TextWidget;
