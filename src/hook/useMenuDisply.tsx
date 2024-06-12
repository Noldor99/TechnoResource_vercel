import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";


export const ShowOnDesktop = ({ children }: any) => {
  const theme = useTheme();
  //@ts-ignore
  const isNonMobile = useMediaQuery(theme.breakpoints.up('md'));

  if (isNonMobile) {
    return children;
  }
  return null;
};

export const ShowOnMobile = ({ children }: any) => {
  const theme = useTheme();
  //@ts-ignore
  const isNonMobile = useMediaQuery(theme.breakpoints.up('md'));

  if (!isNonMobile) {
    return children;
  }
  return null;
};


