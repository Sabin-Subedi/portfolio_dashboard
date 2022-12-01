import { Box } from "@mui/system";
import Navbar from "../../components/Navbar";
import SideNav from "../../components/SideNav";

const Layout = ({ children }) => {
  return <Box sx={{ display: "flex", height: "100vh" }}>{children}</Box>;
};

export const errorLayout = (page) => <Layout>{page}</Layout>;

export default Layout;
