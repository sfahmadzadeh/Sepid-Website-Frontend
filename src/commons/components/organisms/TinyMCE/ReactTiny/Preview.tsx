import React from 'react'

import SecureHTMLDisplay from 'commons/components/organisms/SecureHTMLDisplay'

const TinyPreview = ({ content = '', frameProps = {} }) => {

  return (
    <SecureHTMLDisplay
      content={content}
      customStyle={{ direction: 'rtl' }}
    />
  )
}

export default TinyPreview
