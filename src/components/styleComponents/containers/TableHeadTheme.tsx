import { TableHead, styled } from "@mui/material";
import { tokens } from "../../../theme";

const TableHeadTheme = styled(TableHead)(({ theme }) => ({
  background: `${tokens(theme.palette.mode).primary.DEFAULT}  `,

}));

export default TableHeadTheme;
