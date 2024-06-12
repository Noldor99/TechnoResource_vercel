import React, { FC, useContext } from 'react'
import { Grid, IconButton, useTheme } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'
import { ColorModeContext } from '../theme'

const ThemeSwitcher: FC = (): JSX.Element => {
  const theme = useTheme()
  const colorMode: any = useContext(ColorModeContext)


  return (
    <Grid onClick={colorMode.toggleColorMode}>
      <IconButton sx={{ marginLeft: '5px', marginRight: '25px' }}>
        {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Grid>
  )
}

export default ThemeSwitcher
