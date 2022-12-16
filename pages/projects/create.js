import { Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import * as yup from "yup";
import AppForm from "../../components/Form/AppForm";
import AppInputField from "../../components/Form/AppInputField";

import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AppFileDropField from "../../components/Form/AppFileDropField";
import AppFormButton from "../../components/Form/AppFormButton";
import AppMutltiSelectField from "../../components/Form/AppMultiSelect";
import AppQuillField from "../../components/Form/AppQuillField";
import AppSwitchField from "../../components/Form/AppSwitch";
import PageHeader from "../../components/PageHeader";
import { useAppContext } from "../../context";
import { firebase } from "../../firebase/firebase";
import useFirebase from "../../hooks/useFirebase";
import { useLayoutEffect } from "react";
import firebaseFunctions from "../../constants/firebaseFunctions";
import { ADD_PROJECT, UPDATE_PROJECT } from "../../context/actions";

const initialValues = {
  title: "",
  description: "",
  is_featured: false,
  is_published: false,
  live_project_link: "",
  github_link: "",
  tools: [],
  order: -1,
  project_image: "",
};

const validationSchema = yup.object().shape({
  title: yup.string().required().label("Title"),
  description: yup.string().required().min(100).label("Description"),
  live_project_link: yup.string().url().required().label("Live Project Link"),
  github_link: yup
    .string()
    .url()
    .required()
    .matches("(?:https://)github.com[/](.*)", "Please enter a valid Github URL")
    .label("Github Link"),
  order: yup.number().label("Order"),
  tools: yup
    .array()
    .required()
    .min(2, "Must have at least 2 tools.")
    .required()
    .label("Tools"),
  project_image: yup.object().required().label("Project Image"),
});

function ProjectCreatePage() {
  const [{ user, projects, skills }, dispatch] = useAppContext();
  const router = useRouter();
  const projectId = router.query.project_id;
  const documentRef =
    projectId &&
    firebaseFunctions.getDocRef(
      "projects",
      user?.uid,
      "project_list",
      projectId
    );
  const [formInitialValues, setFormInitialValues] = useState(initialValues);

  const { fire } = useFirebase({
    firebaseFunc: firebase.addDocument,
    toastError: true,
  });

  const { fire: updateFire } = useFirebase({
    firebaseFunc: firebaseFunctions.updateDoc,
    toastError: true,
  });

  // fetch the project detail if projectId is available
  useFirebase({
    firebaseFunc: firebaseFunctions.getDoc,
    fireValues: {
      documentRef,
    },
    autoFire: true,
    onSuccess: (data) => {
      dispatch({
        type: ADD_PROJECT,
        payload: data,
      });
    },
  });

  useLayoutEffect(() => {
    if (projects && projectId) {
      console.log(projectId, projects);
      const project = projects.find((project) => project.id === projectId);
      if (project) {
        setFormInitialValues(project);
      }
    }
  }, [projects, projectId]);

  return (
    <>
      <PageHeader
        title="Create a new project"
        breadcrumbs={[
          {
            label: "Project",
            href: "/projects/lists",
          },
          {
            label: "Create",
            href: "/create",
          },
        ]}
      />

      <AppForm
        disabled
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            setSubmitting(true);
            if (!user && !user.uid) {
              throw new Error("User not logged in.");
            }
            const { uid } = user;
            if (projectId) {
              await updateFire({
                documentRef,
                data: values,
              });
            } else {
              await fire({
                collectionName: `projects/${uid}/project_list`,
                data: values,
              });
            }
            toast.success("Post Created Successfully.");
            router.push("/projects/lists");
          } catch (err) {
            console.log(err);
          } finally {
            setSubmitting(false);
          }
        }}
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
                uploadFolder="projects"
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
                options={
                  skills
                    ? skills.map((skill) => {
                        return {
                          label: skill.title,
                          value: skill.id,
                        };
                      })
                    : []
                }
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
