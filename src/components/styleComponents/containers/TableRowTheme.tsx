import { TableRow, styled } from "@mui/material";
import { tokens } from "../../../theme";

const TableRowTheme = styled(TableRow)(({ theme }) => ({
  background: `${tokens(theme.palette.mode).primary.DEFAULT}  `,
  border: `1px solid ${tokens(theme.palette.mode).borderColor}`,
  borderRadius: "0",
  '&:hover': { backgroundColor: tokens(theme.palette.mode).borderColor },
  cursor: 'pointer'
}));

export default TableRowTheme;
