import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Toolbar } from '@mui/material'
import HeaderAdmin from './HeaderAdmin'
import DrawerAdmin from './DrawerAdmin'

const drawerWidth = 240;

const LayoutAdmin: FC = (): JSX.Element => {


  return (
    <Box sx={{ display: 'flex' }}>
      <HeaderAdmin drawerWidth={drawerWidth} />
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <DrawerAdmin drawerWidth={drawerWidth} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1, paddingTop: 2, paddingBottom: 2, overflowX: 'auto',
          width: { md: `calc(100%  ${drawerWidth}px)` }
        }}
      >

        <Toolbar />
        <Outlet />

      </Box>
    </Box>
  )
}

export default LayoutAdmin
