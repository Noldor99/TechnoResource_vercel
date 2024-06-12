import { Drawer, ListItemButton, styled } from '@mui/material'
import { tokens } from '../../../theme';

const DrawerThema = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    color: theme.palette.secondary.main,
    background: `${tokens(theme.palette.mode).primary.DEFAULT} !important`,
    boxSizing: 'border-box',
  },
}));


export default DrawerThema
