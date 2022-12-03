import { Grid, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import AppForm from "../../components/Form/AppForm";
import * as yup from "yup";
import AppInputField from "../../components/Form/AppInputField";

import AppQuillField from "../../components/Form/AppQuillField";
import Dropzone from "../../components/DropZone";
import AppFileDropField from "../../components/Form/AppFileDropField";
import AppSwitchField from "../../components/Form/AppSwitch";
import AppMutltiSelectField from "../../components/Form/AppMultiSelect";
import AppFormButton from "../../components/Form/AppFormButton";

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
  github_link: yup.string().required().label("Github Link"),
  order: yup.number().label("Order"),
  tools: yup.array().of(yup.string()).required().label("Label"),
});

function ProjectCreatePage() {
  return (
    <>
      <Typography mb={5} fontWeight={500} variant="h3">
        Create a new project
      </Typography>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
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
              <AppInputField fullWidth name="title" label="Project Title" />
              <AppInputField
                fullWidth
                name="github_link"
                label="Project Github Link"
              />
              <AppInputField
                fullWidth
                name="live_project_link"
                label="Live Project Link"
                placeholder="Enter the project live URL"
              />
              <AppQuillField name="description" label="Description" />

              <AppFileDropField
                name="project_image"
                label="Project Cover Image"
              />
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
            >
              <AppSwitchField name="is_published" label="Publish" />
              <AppSwitchField name="is_featured" label="Featured" />
              <AppMutltiSelectField
                sx={{ marginTop: "1rem" }}
                name="tools"
                label="Tools"
              />
            </Paper>
            <AppFormButton
              block
              sx={{ margin: "1.5rem 0", borderRadius: "0.5rem" }}
              mt={5}
            >
              Post
            </AppFormButton>
          </Grid>
        </Grid>
      </AppForm>
    </>
  );
}

export default ProjectCreatePage;
