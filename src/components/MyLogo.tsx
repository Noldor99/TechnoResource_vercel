import { Box, Typography } from '@mui/material'
import React from 'react'
//@ts-ignore
import Logo from '../assets/images/sidebar/logo.svg'

const MyLogo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img src={Logo} alt="Logo" />
      <Typography variant="h1" >
        Techno
      </Typography>
    </Box>
  )
}

export default MyLogo