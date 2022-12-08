import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import SideNav from "../../components/SideNav";

const LoginLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          flexGrow: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Typography variant="h3" color="grey.800" mt={5}>
          Hi, Welcome back
        </Typography>
        <Box
          sx={{
            position: "relative",
            maxWidth: "45rem",
            minWidth: "25rem",
            maxHeight: "100%",
            width: "45rem",
            height: "45rem",
          }}
        >
          <Image
            src="/img/illustration_dashboard.png"
            layout="fill"
            placeholder="blur"
            blurDataURL="/img/illustration_dashboard.png"
            objectFit="contain"
            alt=""
          />
        </Box>
        <div className="base_overlay"></div>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export const loginLayout = (page) => <LoginLayout>{page}</LoginLayout>;

export default LoginLayout;
