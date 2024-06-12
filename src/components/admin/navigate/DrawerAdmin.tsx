import { AdminPanelSettingsOutlined, LogoutOutlined } from '@mui/icons-material';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { navMenuAdmin } from '../../../common/moks/navigate';
import { useAppSelector } from '../../../hook';
import { useLogoutUser } from '../../../hook/useAuth';
import { selectIsOpenMenu, SWITCH_MENU } from '../../../store/slice/booleanSlice';
import SearchBarComponent from '../../SearchBarComponent';
import DrawerThema from '../../styleComponents/containers/DrawerThema';
import ListItemButtonBlue from '../../styleComponents/buttons/ListItemButtonBlue';
import { BASE_URL } from '../../../URL';
import MyLogo from '../../MyLogo';

interface Props {
  window?: () => Window;
  drawerWidth: number
}


const DrawerAdmin = (props: Props) => {
  const { window, drawerWidth } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isOpenMenu = useAppSelector(selectIsOpenMenu)

  const { logout } = useLogoutUser()

  const renderNavMenu = navMenuAdmin.map((element): JSX.Element => {
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
        <ListItem>
          <ListItemButtonBlue onClick={() => navigate(`${BASE_URL}`)}>
            <ListItemIcon>
              <AdminPanelSettingsOutlined />
            </ListItemIcon>
            <ListItemText>
              <Typography>User</Typography>
            </ListItemText>
          </ListItemButtonBlue>
        </ListItem>

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
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </DrawerThema>
      <DrawerThema
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </DrawerThema>
    </Box>
  )
}

export default DrawerAdmin