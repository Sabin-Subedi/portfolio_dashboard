import { Box } from "@mui/material";
import { useRouter } from "next/router.js";
import React from "react";
import { toast } from "react-hot-toast";
import firebaseFunctions from "../../constants/firebaseFunctions.js";
import { LOGOUT_USER } from "../../context/actions.js";
import { useAppContext } from "../../context/index.js";
import useFirebase from "../../hooks/useFirebase.js";
import AvatarDropdown from "../Dropdown.js/AvatarDropDown/index.js";
import NotificationDropDown from "../Dropdown.js/NotificaitonDropDown/index.js";

function Navbar() {
  const router = useRouter();
  const [state, dispatch] = useAppContext();
  const { success, error, fire } = useFirebase({
    firebaseFunc: firebaseFunctions.logOut,
    onSuccess: () => {
      dispatch({ type: LOGOUT_USER });
      toast.success("Logged out successfully");
    },
  });

  // useEffect(() => {
  //   if (error?.message) {
  //     toast.error(error.message);
  //   } else if (success) {
  //     router.push("/login");
  //     toast.success("Logged out successfully");
  //   }
  // }, [success, error, router]);

  return (
    <Box sx={{ display: "flex", py: 4, justifyContent: "flex-end" }}>
      <NotificationDropDown />
      <AvatarDropdown logOut={fire} />
    </Box>
  );
}

export default Navbar;
