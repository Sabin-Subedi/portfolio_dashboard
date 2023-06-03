import { Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import * as yup from "yup";
import AppForm from "../../components/Form/AppForm";
import AppInputField from "../../components/Form/AppInputField";

import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import toast from "react-hot-toast";
import AppFileDropField from "../../components/Form/AppFileDropField";
import AppFormButton from "../../components/Form/AppFormButton";
import AppSwitchField from "../../components/Form/AppSwitch";
import PageHeader from "../../components/PageHeader";
import firebaseFunctions from "../../constants/firebaseFunctions";
import { useAppContext } from "../../context";
import { ADD_PROJECT, ADD_SKILL } from "../../context/actions";
import { firebase } from "../../firebase/firebase";
import useFirebase from "../../hooks/useFirebase";

const initialValues = {
  title: "",
  order: null,
  is_active: true,
  skill_image: "",
};

const validationSchema = yup.object().shape({
  title: yup.string().required().label("Title"),
  order: yup.number().nullable().label("Order"),
  is_active: yup.boolean().label("Is Active"),
  skill_image: yup.object().required().label("Skill Image"),
});

function SkillCreatePage() {
  const [{ user, skills }, dispatch] = useAppContext();
  const router = useRouter();
  const skillId = router.query.project_id;
  const documentRef = skillId && firebaseFunctions.getDocRef("skills", skillId);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);

  const { fire, error } = useFirebase({
    firebaseFunc: firebase.addDocument,
    toastError: true,
    onSuccess: (data) => {
      toast.success("Skill created successfully");
      router.push("/skills/lists");
    },
  });

  const { fire: updateFire, error: updateError } = useFirebase({
    firebaseFunc: firebaseFunctions.updateDoc,
    toastError: true,
    onSuccess: (data) => {
      toast.success("Skill created successfully");
      router.push("/skills/lists");
    },
  });

  // fetch the project detail if skillId is available
  useFirebase({
    firebaseFunc: firebaseFunctions.getDoc,
    fireValues: {
      documentRef,
    },
    autoFire: true,
    onSuccess: (data) => {
      dispatch({
        type: ADD_SKILL,
        payload: data,
      });
    },
  });

  useLayoutEffect(() => {
    if (skills && skillId) {
      const project = skills.find((project) => project.id === skillId);
      if (project) {
        setFormInitialValues(project);
      }
    }
  }, [skills, skillId]);

  return (
    <>
      <PageHeader
        title="Add new skill"
        breadcrumbs={[
          {
            label: "Skills",
            href: "/skills/lists",
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

            if (skillId) {
              await updateFire({
                documentRef,
                data: values,
              });
            } else {
              const response = await fire({
                collectionName: `skills/${user.uid}/skill_list/`,
                data: values,
              });
            }
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
              <AppInputField fullWidth name="title" label="Skill Title" />

              <AppFileDropField
                name="skill_image"
                uploadFolder="skills"
                label="Skill Logo Or Image"
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
              <AppSwitchField
                sx={{ mb: 2 }}
                name="is_active"
                label="Is Active"
              />
              <AppInputField
                fullWidth
                name="order"
                label="Listing Order"
                type="number"
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

export default SkillCreatePage;
