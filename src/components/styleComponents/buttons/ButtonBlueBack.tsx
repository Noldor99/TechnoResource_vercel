import { Button, styled } from '@mui/material'
import { tokens } from '../../../theme';

const ButtonBlueBack = styled(Button)(({ theme }) => ({
  border: `1px solid ${tokens(theme.palette.mode).borderColor}`,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: '#1900D5 !important',
  }
}));


export default ButtonBlueBack
