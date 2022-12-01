import { Box } from "@mui/material";
import Head from "next/head";
import DropDown from "../components/Dropdown.js";
import { useAppContext } from "../context/index.js";

export default function Home() {
  const context = useAppContext();
  console.log(context);
  return (
    <Box mt={5}>
      hello
      <DropDown>klkjklx</DropDown>
    </Box>
  );
}
