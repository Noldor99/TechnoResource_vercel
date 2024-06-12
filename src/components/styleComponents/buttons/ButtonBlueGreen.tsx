import { Button, styled } from '@mui/material'
import { tokens } from '../../../theme';

const ButtonBlueGreen = styled(Button)(({ theme }) => ({
  border: '1px solid #1e8023', background: '#1958b5',
  color: 'white', fontWeight: 700,
  '&:hover': {
    backgroundColor: '#1900D5 !important',
  }
}));


export default ButtonBlueGreen
