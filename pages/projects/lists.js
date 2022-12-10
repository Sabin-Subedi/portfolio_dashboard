import { Box, Button, Chip, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  FiCheckCircle,
  FiEdit,
  FiGithub,
  FiLink,
  FiPlus,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import AppTable from "../../components/AppTable";
import PageHeader from "../../components/PageHeader";
import firebaseFunctions from "../../constants/firebaseFunctions";
import { useAppContext } from "../../context";
import { GET_PROJECTS } from "../../context/actions";
import useFirebase from "../../hooks/useFirebase";
import { formatFirebaseDate } from "../../utils/utils";

const BooleanView = ({ content }) => {
  return (
    <Box
      color={content ? "success.main" : "error.main"}
      sx={{ fontSize: "1.2rem" }}
    >
      {content ? <FiCheckCircle /> : <FiXCircle />}
    </Box>
  );
};

const TableSchema = [
  {
    id: "title",
    label: "Project Title",
    key: "title",
    component: ({ content, record }) => (
      <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: "5rem",
            height: "3.5rem",
            overflow: "hidden",
            mr: 2,
            borderRadius: "0.5rem",
            position: "relative",
          }}
        >
          <Image
            src={record.project_image}
            layout="fill"
            objectFit="cover"
            alt={record.title}
          />
        </Box>
        {content}
      </Box>
    ),
  },
  {
    id: "created_at",
    label: "Created At",
    key: "createdAt",
    component: ({ content }) => formatFirebaseDate(content),
  },
  {
    id: "featured",
    label: "Featured",
    key: "is_featured",
    align: "center",
    component: BooleanView,
  },
  {
    id: "published",
    label: "Published",
    key: "is_published",
    align: "center",
    component: BooleanView,
  },
  {
    id: "tools",
    label: "Technologies",
    key: "tools",
    component: ({ content, index }) =>
      content.map((item) => (
        <Chip
          size="small"
          key={content.value + index}
          sx={{ mr: 1, my: 1, textTransform: "capitalize" }}
          label={item.label}
          variant="outlined"
          color="primary"
        />
      )),
  },
];

const TableAction = [
  {
    item: "Delete",
    component: () => (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          color: "error.main",
        }}
      >
        <FiTrash2 />
        <Typography>Delete</Typography>
      </Box>
    ),
  },
  {
    item: "Edit",
    link: `/proects/create/:recordId`,
    component: () => (
      <Box
        sx={{ display: "flex", gap: 1, alignItems: "center", color: "grey" }}
      >
        <FiEdit />
        <Typography>Edit</Typography>
      </Box>
    ),
  },
  {
    item: "live_project_link",
    onClick: (record) =>
      record?.live_project_link &&
      window.open(record.live_project_link, "_newtab"),
    component: () => {
      return (
        <>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              color: "grey",
            }}
          >
            <FiLink />
            <Typography>Live Project</Typography>
          </Box>
        </>
      );
    },
  },
  {
    item: "github_link",
    onClick: (record) =>
      record?.github_link && window.open(record.github_link, "_newtab"),
    component: () => {
      return (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            color: "grey",
          }}
        >
          <FiGithub />
          <Typography>Github</Typography>
        </Box>
      );
    },
  },
];

function ProjectsPage() {
  const [{ user, projects }, dispatch] = useAppContext();
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
        <AppTable
          tableAction={TableAction}
          collection={projects}
          schema={TableSchema}
        />
      </Box>
    </>
  );
}

export default ProjectsPage;
