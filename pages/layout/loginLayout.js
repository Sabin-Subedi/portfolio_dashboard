import { Box } from "@mui/system";
import Navbar from "../../components/Navbar";
import SideNav from "../../components/SideNav";

const LoginLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
};

export const loginLayout = (page) => <LoginLayout>{page}</LoginLayout>;

export default LoginLayout;
