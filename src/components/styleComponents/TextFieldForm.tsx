import { TextField, styled } from '@mui/material'
import { tokens } from '../../theme';

const TextFieldForm = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {

  },
  "& .Mui-focused": {
    color: `${theme.palette.text.primary} !important`,

  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: `${theme.palette.text.primary} !important`,
    color: `${theme.palette.text.primary} !important `,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    // '-webkit-box-shadow': '0 0 0 100px #000000 inset',
  },
  '& .MuiInputBase-input': {
    // '-webkit-box-shadow': 'none !important',
    '-webkit-box-shadow': `0 0 0 100px ${tokens(theme.palette.mode).primary.DEFAULT} inset !important`,
  },
}));


export default TextFieldForm  
