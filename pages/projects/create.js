import { Grid, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import AppForm from "../../components/Form/AppForm";
import * as yup from "yup";
import AppInputField from "../../components/Form/AppInputField";

import AppQuillField from "../../components/Form/AppQuillField";
import Dropzone from "../../components/DropZone";

const initialValues = {
  title: "sds",
  description: "",
  is_featured: false,
  is_published: false,
  live_project_link: "",
  github_link: "",
  tools: [],
  order: -1,
};

const validationSchema = yup.object().shape({
  title: yup.string().required().label("Title"),
  description: yup.string().required().label("Description"),
  live_project_link: yup.string().required().label("Live Project Link"),
  github_link: yup.string().required().label(""),
  order: yup.number().label("Order"),
  tools: yup.array().required("Tools"),
});

function ProjectCreatePage() {
  return (
    <>
      <Typography mb={5} fontWeight={500} variant="h3">
        Create a new project
      </Typography>

      <Grid container spacing={3}>
        <Grid mb={5} item xs={8}>
          <Paper
            p={5}
            sx={{
              borderRadius: "1rem",
              boxShadow:
                "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
              padding: 3,
            }}
          >
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              <AppInputField fullWidth name="title" label="Project Title" />

              <AppQuillField name="description" label="Description" />
              <Dropzone />
            </AppForm>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            p={5}
            sx={{
              borderRadius: "1rem",
              boxShadow:
                "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
              padding: 3,
            }}
          ></Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ProjectCreatePage;
