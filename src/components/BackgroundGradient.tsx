import { Box, Grid } from '@mui/material'
import React from 'react'
import { ShowOnDesktop, ShowOnMobile } from '../hook/useMenuDisply'

const BackgroundGradient = () => {
  return (
    <>
      <ShowOnDesktop>
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: -1 }} >
          <Grid container justifyContent='space-between'>
            <Grid item xs sm={2}>
              <Box sx={{ height: '40vh', background: 'rgb(255, 93, 93)', filter: 'blur(90px)' }}></Box>
            </Grid>
            <Grid item xs sm={2}>
              <Box sx={{ height: '40vh', background: '#e49904', filter: 'blur(90px)' }}></Box>
            </Grid>
            <Grid item xs sm={2}>
              <Box sx={{ height: '40vh', background: '#5dc9ff', filter: 'blur(90px)', }}></Box>
            </Grid>
          </Grid>
        </Box>
      </ShowOnDesktop>
      <ShowOnMobile>
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: -1 }} >
          <Box sx={{ height: '40vh', background: '#e49904', filter: 'blur(90px)' }}></Box>
        </Box>
      </ShowOnMobile>
    </ >
  )
}

export default BackgroundGradient