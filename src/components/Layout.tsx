import { FC } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { Box, Grid, Toolbar } from '@mui/material'
import Header from './Header'
import DrawerComponent from './DrawerComponent'
import { BASE_URL } from '../URL'




const Layout: FC = (): JSX.Element => {
  const location = useLocation()

  return location.pathname.startsWith(`${BASE_URL}/admin`)
    || location.pathname === `${BASE_URL}/register`
    || location.pathname === `${BASE_URL}/login`
    || location.pathname === `${BASE_URL}/reset`
    ? (
      <>
        <Outlet />
      </>
    ) : (
      <Box>
        <Box>
          <Header />
          <Box
            component="main"
            sx={{ flexGrow: 1, paddingTop: 3, paddingBottom: 3 }}
          >
            <DrawerComponent />
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </Box >
    )
}

export default Layout
