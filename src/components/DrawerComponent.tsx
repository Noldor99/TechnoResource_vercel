import { Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { selectIsOpenMenu, SWITCH_MENU } from '../store/slice/booleanSlice';
import { useAppSelector } from '../hook';
import { navMenuUser } from '../common/moks/navigate';
import ListItemButtonBlue from './styleComponents/buttons/ListItemButtonBlue';
import { useNavigate } from 'react-router-dom';
import DrawerThema from './styleComponents/containers/DrawerThema';
import { AdminPanelSettingsOutlined, LogoutOutlined } from '@mui/icons-material';
import { ShowOnLogout, ShowOnLogin } from '../hook/useHiddenLink';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useLogoutUser } from '../hook/useAuth';
import SearchBarComponent from './SearchBarComponent';
//@ts-ignore
import Logo from '../assets/images/sidebar/logo.svg'
import { BASE_URL } from '../URL';
import MyLogo from './MyLogo';


const drawerWidth = 240;

interface Props {
  window?: () => Window;
}


const DrawerComponent = (props: Props) => {
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isOpenMenu = useAppSelector(selectIsOpenMenu)

  const { logout } = useLogoutUser()

  const renderNavMenu = navMenuUser.map((element): JSX.Element => {
    return (
      <ListItem key={element.id}>
        <ListItemButtonBlue onClick={() => navigate(`${element.path}`)}>
          <ListItemIcon>{element.icon}</ListItemIcon>
          <ListItemText>
            <Typography variant="body1">{element.name}</Typography>
          </ListItemText>
        </ListItemButtonBlue>
      </ListItem>
    )
  })

  const drawer = (
    <div>
      <List>
        <ListItem>
          <MyLogo />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          {/* @ts-ignore */}
          <SearchBarComponent />
        </ListItem>
      </List>
      <List>
        {renderNavMenu}
      </List>
      <Divider />
      <List>
        <ShowOnLogout>
          <ListItem>
            <ListItemButtonBlue onClick={() => navigate(`${BASE_URL}/login`)}>
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography>Login</Typography>
              </ListItemText>
            </ListItemButtonBlue>
          </ListItem>
        </ShowOnLogout>
        <ListItem>
          <ListItemButtonBlue onClick={() => navigate('admin')}>
            <ListItemIcon>
              <AdminPanelSettingsOutlined />
            </ListItemIcon>
            <ListItemText>
              <Typography>Admin</Typography>
            </ListItemText>
          </ListItemButtonBlue>
        </ListItem>
        <ShowOnLogin>
          <ListItem>
            <ListItemButtonBlue onClick={logout}>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText>
                <Typography>Logout</Typography>
              </ListItemText>
            </ListItemButtonBlue>
          </ListItem>
        </ShowOnLogin>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <DrawerThema
        container={container}
        variant="temporary"
        open={isOpenMenu}
        onClose={() => dispatch(SWITCH_MENU({}))}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </DrawerThema>
    </Box>
  )
}

export default DrawerComponent