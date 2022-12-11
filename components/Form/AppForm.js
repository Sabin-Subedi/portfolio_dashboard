import { Form, Formik } from "formik";
import React from "react";

function AppForm({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  disabled,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ handleSubmit }) => <Form onSubmit={handleSubmit}>{children}</Form>}
    </Formik>
  );
}

export default AppForm;
