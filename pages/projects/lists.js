import { Box, Button } from "@mui/material";
import { where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import AppTable from "../../components/AppTable";
import PageHeader from "../../components/PageHeader";
import firebaseFunctions from "../../constants/firebaseFunctions";
import { useAppContext } from "../../context";
import { GET_PROJECTS } from "../../context/actions";
import useFirebase from "../../hooks/useFirebase";

function ProjectsPage() {
  const [{ user }, dispatch] = useAppContext();
  const { fire } = useFirebase({
    firebaseFunc: firebaseFunctions.getDocs,
    onSuccess: (data) => {
      dispatch({
        type: GET_PROJECTS,
        payload: data,
      });
    },
  });

  useEffect(() => {
    if (user && user.uid) {
      fire({
        collectionRef: firebaseFunctions.getCollectionRef(
          `projects/${user.uid}/project_list`
        ),
      });
    }
  }, [user]);

  return (
    <>
      <PageHeader
        title="Project List"
        breadcrumbs={[
          {
            label: "Projects",
            href: "/projects/lists",
          },
          {
            label: "List",
            href: "/projects/lists",
          },
        ]}
        extraComp={
          <Link href="/projects/create" passHref>
            <Button size="small" startIcon={<FiPlus />}>
              New Project
            </Button>
          </Link>
        }
      />
      <Box sx={{ pb: 5 }}>
        <AppTable />
      </Box>
    </>
  );
}

export default ProjectsPage;
