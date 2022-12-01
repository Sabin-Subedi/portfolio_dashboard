import {
  Box,
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";
import { loginLayout } from "../layout/loginLayout";
import * as yup from "yup";
import AppForm from "../../components/Form/AppForm";
import AppInputField from "../../components/Form/AppInputField";

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password"),
});

const initialValues = {
  email: "",
  password: "",
};

function LoginPage() {
  return (
    <Box
      sx={{
        minWidth: "30rem",
      }}
    >
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        <AppInputField
          fullWidth={true}
          label="Email"
          placeholder="Enter your email..."
          name="email"
          type="email"
        />
      </AppForm>
    </Box>
  );
}

LoginPage.getLayout = loginLayout;

export default LoginPage;
