import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/slice/authSlice";

export const ShowOnLogin = ({ children }: any) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }: any) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return children;
  }
  return null;
};

