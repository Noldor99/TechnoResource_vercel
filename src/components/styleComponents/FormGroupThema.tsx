import { FormGroup, styled } from '@mui/material'
import { tokens } from '../../theme';

const FormGroupThema = styled(FormGroup)(({ theme }) => ({

  color: theme.palette.secondary.main,
  background: `${tokens(theme.palette.mode).primary.DEFAULT} !important`,
  boxSizing: 'border-box',
  boxShadow: `${tokens(theme.palette.mode).boxShadow} !important`,
  borderRadius: '12px'
}));


export default FormGroupThema
