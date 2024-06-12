import { Paper, styled } from "@mui/material";
import { tokens } from "../../../theme";

const PaperSharp = styled(Paper)(({ theme }) => ({
  background: `${tokens(theme.palette.mode).primary.DEFAULT} !important`,
  border: `1px solid ${tokens(theme.palette.mode).borderColor}`,
  borderRadius: "0",
}));

export default PaperSharp;
