import React from 'react'

import Frame from '../Frame'
import fixDocumentMathElements from './fixDocumentMathElements'

const TinyPreview = ({ content = '', frameProps = {} }) => {

  return (
    <Frame
      handleUpdateContent={(doc) => { fixDocumentMathElements(doc) }}
      content={content}
      frameProps={frameProps}
    />
  )
}

export default TinyPreview
