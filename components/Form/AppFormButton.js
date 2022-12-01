import { Button, CircularProgress } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

function AppFormButton({
  children,
  size = "large",
  variant = "contained",
  block = true,
  ...props
}) {
  const { isSubmitting } = useFormikContext();

  return (
    <Button
      variant={variant}
      size={size}
      disabled={isSubmitting}
      type="submit"
      fullWidth={block}
      {...props}
    >
      {isSubmitting ? <CircularProgress color="inherit" size={25} /> : children}
    </Button>
  );
}

export default AppFormButton;
