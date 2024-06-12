import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { SWITCH_MENU } from '../store/slice/booleanSlice';
import AppBarThema from './styleComponents/containers/AppBarThema';
import ThemeSwitcher from './ThemeSwitcher';
import { useInitAuthSlice, useLogoutUser } from '../hook/useAuth';
import { Badge, Button } from '@mui/material';
import { navMenuUser } from '../common/moks/navigate';
import { ShowOnDesktop, ShowOnMobile } from '../hook/useMenuDisply';
import { useNavigate } from 'react-router-dom';
import ButtonWhite from './styleComponents/buttons/ButtonWhite';
import { ShowOnLogin, ShowOnLogout } from '../hook/useHiddenLink';
//@ts-ignore
import Logo from '../assets/images/sidebar/logo.svg'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity
} from '../store/slice/cartSlice';
import FlexBetween from './styleComponents/FlexBetween';
import { useEffect } from 'react';
import { BASE_URL } from '../URL';
import MyLogo from './MyLogo';

function ResponsiveDrawer() {

  const dispatch = useDispatch()

  const { displayName } = useInitAuthSlice()
  const { logout } = useLogoutUser()
  const navigate = useNavigate()

  const CartTotalQuantity = useSelector(selectCartTotalQuantity);


  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({}));
    dispatch(CALCULATE_TOTAL_QUANTITY({}));
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarThema
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
          <ShowOnDesktop>
            <MyLogo />
          </ShowOnDesktop>
          <ShowOnDesktop>
            <ShowOnLogin>
              <Typography>{displayName}</Typography>
            </ShowOnLogin>
            <Button variant='outlined' color="success"
              onClick={() => navigate('admin')}>
              Admin
            </Button>
            <ShowOnLogout>
              <Button variant='outlined' color="success"
                onClick={() => navigate(`${BASE_URL}/login`)}>
                Login
              </Button>
            </ShowOnLogout>
            <ShowOnLogin>
              <Button variant='outlined' color="success"
                onClick={() => logout()}>
                Logout
              </Button>
            </ShowOnLogin>
          </ShowOnDesktop>
          <ShowOnDesktop>
            <Box  >
              {navMenuUser.map((item) => (
                <ButtonWhite key={item.id}
                  onClick={() => navigate(`${item.path}`)}>

                  {item.name}
                </ButtonWhite>
              ))}
            </Box>
          </ShowOnDesktop>
          <FlexBetween>
            <ThemeSwitcher />
            <IconButton onClick={() => navigate('cart')}>
              <Badge sx={{
                "& .MuiBadge-badge": { backgroundColor: '#1e8023', color: 'white' }
              }} badgeContent={CartTotalQuantity}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </FlexBetween>
        </Toolbar>
      </AppBarThema>

    </Box >
  );
}


export default ResponsiveDrawer;
