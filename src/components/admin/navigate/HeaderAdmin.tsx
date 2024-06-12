import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useInitAuthSlice } from '../../../hook/useAuth';
import { ShowOnMobile } from '../../../hook/useMenuDisply';
import { SWITCH_MENU } from '../../../store/slice/booleanSlice';
import AppBarThema from '../../styleComponents/containers/AppBarThema';
import ThemeSwitcher from '../../ThemeSwitcher';

interface HeaderAdminProps {
  drawerWidth: number
}

function HeaderAdmin({ drawerWidth }: HeaderAdminProps) {

  const dispatch = useDispatch()

  const { displayName } = useInitAuthSlice()


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarThema
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
        position="fixed"
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <ShowOnMobile>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => { dispatch(SWITCH_MENU({})) }}
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          </ShowOnMobile>
          <Typography>{displayName}</Typography>
          <ThemeSwitcher />
        </Toolbar>
      </AppBarThema>

    </Box>
  );
}


export default HeaderAdmin;
