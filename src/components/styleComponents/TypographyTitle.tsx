import { Typography, styled } from '@mui/material'
import { tokens } from '../../theme';

const TypographyTitle = styled(Typography)(({ theme, color }) => ({
  // @ts-ignore
  color: color === "my" ? theme.palette.text.secondary : "inherit",
}));

export default TypographyTitle;
