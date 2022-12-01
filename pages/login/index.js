import {
  Alert,
  Box,
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { loginLayout } from "../layout/loginLayout";
import * as yup from "yup";
import AppForm from "../../components/Form/AppForm";
import AppInputField from "../../components/Form/AppInputField";
import AppFormButton from "../../components/Form/AppFormButton";
import useFirebase from "../../hooks/useFirebase";
import { useAppContext } from "../../context";
import { LOGIN_USER } from "../../context/actions";
import { useRouter } from "next/router";

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password"),
});

const initialValues = {
  email: "",
  password: "",
};

function LoginPage({ firebase }) {
  const { fire, data, error } = useFirebase({
    firebaseFunc: firebase.signInUser,
  });
  const [state, dispatch] = useAppContext();
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    await fire(values);
    data && dispatch({ type: LOGIN_USER, payload: data.user });
    setSubmitting(false);
    router.push("/");
  };

  useLayoutEffect(() => {
    if (state.isLoggedIn) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "25rem",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "1.5rem" }}>
        Sign in
      </Typography>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <AppInputField
          fullWidth={true}
          label="Email address"
          required
          name="email"
          type="email"
        />
        <AppInputField
          fullWidth={true}
          label="Password"
          name="password"
          type="password"
        />
        {error?.message && (
          <Alert
            variant="filled"
            severity="error"
            sx={{ marginBottom: "1.2rem" }}
          >
            {error.message}
          </Alert>
        )}
        <AppFormButton>Login</AppFormButton>
      </AppForm>
    </Box>
  );
}

LoginPage.getLayout = loginLayout;

export default LoginPage;
