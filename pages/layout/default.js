import { Box } from "@mui/system";
import Navbar from "../../components/Navbar";
import SideNav from "../../components/SideNav";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexBasis: "20%", height: "100%" }}>
        <SideNav />
      </Box>
      <Box sx={{ flexBasis: "80%", px: 5 }}>
        <Navbar />
        {children}
      </Box>
    </Box>
  );
};

export const defaultLayout = (page) => <Layout>{page}</Layout>;

export default Layout;
