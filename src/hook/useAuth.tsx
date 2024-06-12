import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../store/slice/authSlice";
import { BASE_URL } from "../URL";

export const useInitAuthSlice = () => {
  const [displayName, setdisplayName] = useState("");

  const dispatch = useDispatch();

  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        console.log(user);
        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER({}));
      }
    });
  }, [dispatch, displayName]);

  return { displayName }
}

export const useLogoutUser = () => {

  const navigate = useNavigate();

  function logout() {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate(`${BASE_URL}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return { logout }

}

