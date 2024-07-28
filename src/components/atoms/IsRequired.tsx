import { Box, Typography } from "@mui/material"
import React from "react"

const IsRequired = ({ disabled = false, children }) => {
  return (
    <Box position={'relative'}>
      {!disabled && <Typography position={'absolute'} left={-2} top={-4} fontWeight={800} color={'red'}>{'*'}</Typography>}
      {children}
    </Box>
  )
}

export default IsRequired;