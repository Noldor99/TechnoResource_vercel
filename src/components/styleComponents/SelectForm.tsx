import { Select, styled } from '@mui/material'
import { tokens } from '../../theme';

const SelectForm = styled(Select)(({ theme }) => ({
  // "& .css-m9ld5h-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
  //   borderColor: `${tokens(theme.palette.mode).primary.DEFAULT} !important`,
  //   color: `${tokens(theme.palette.mode).primary.DEFAULT} !important `,
  //   border: '1px solid !important'
  // },
  // '& .MuiOutlinedInput-notchedOutline': {
  //   borderColor: `${theme.palette.text.primary} !important `,
  //   borderWidth: '1px',
  // },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    // borderColor: `${theme.palette.text.primary} !important `,
    // borderWidth: '2px',
    // zIndex: 1
  }
}));

export default SelectForm;
