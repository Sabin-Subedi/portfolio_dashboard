import { Box } from "@mui/system";
import Navbar from "../../components/Navbar";
import SideNav from "../../components/SideNav";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", height: "100vh" }}>
      <Box
        sx={{
          flexBasis: "24%",
          height: "100%",
          "&::before": {
            content: '""',
            width: "100%",
            position: "relative",
            top: 0,
            background: "white",
            zIndex: 2,
            left: 0,
            height: "100%",
            opacity: 0,
          },
        }}
      >
        <SideNav />
      </Box>
      <Box sx={{ flexBasis: "76%", px: 5 }}>
        <Navbar />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export const defaultLayout = (page) => <Layout>{page}</Layout>;

export default Layout;
