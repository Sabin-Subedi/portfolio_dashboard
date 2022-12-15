import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import {
  FiCheckCircle,
  FiEdit,
  FiPlus,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import AppImage from "../../components/AppImage";
import AppTable from "../../components/AppTable";
import PageHeader from "../../components/PageHeader";
import firebaseFunctions from "../../constants/firebaseFunctions";
import { useAppContext } from "../../context";
import { GET_SKILLS } from "../../context/actions";
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
    label: "Title",
    key: "title",
    component: ({ content, record }) => (
      <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
        {record?.skill_image && (
          <Box
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              overflow: "hidden",
              mr: 2,
              backgroundColor: "grey.100",
              borderRadius: "0.5rem",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppImage
              src={record?.skill_image?.imageUrl}
              width={50}
              height={50}
              objectFit="contain"
              alt={record.title}
            />
          </Box>
        )}
        {content}
      </Box>
    ),
  },
  {
    id: "display_order",
    label: "Display Order",
    key: "order",
  },
  {
    id: "created_at",
    label: "Created At",
    key: "createdAt",
    component: ({ content }) => formatFirebaseDate(content),
  },
  {
    id: "active",
    label: "Active",
    key: "is_active",
    align: "center",
    component: BooleanView,
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
    link: `/projects/create/?project_id=:recordId`,
    component: () => (
      <Box
        sx={{ display: "flex", gap: 1, alignItems: "center", color: "grey" }}
      >
        <FiEdit />
        <Typography>Edit</Typography>
      </Box>
    ),
  },
];

function SkillListPage() {
  const [{ user, skills }, dispatch] = useAppContext();
  const { fire, loading } = useFirebase({
    firebaseFunc: firebaseFunctions.getDocs,
    onSuccess: (data) => {
      dispatch({
        type: GET_SKILLS,
        payload: data,
      });
    },
    autoFire: true,
    fireValues: {
      collectionRef: firebaseFunctions.getCollectionRef("skills"),
    },
  });

  return (
    <>
      <PageHeader
        title="Skill List"
        breadcrumbs={[
          {
            label: "Skills",
            href: "/skills/lists",
          },
          {
            label: "List",
            href: "/skills/lists",
          },
        ]}
        extraComp={
          <Link href="/skills/create" passHref>
            <Button size="small" startIcon={<FiPlus />}>
              Add New Skill
            </Button>
          </Link>
        }
      />
      <Box sx={{ pb: 5 }}>
        <AppTable
          loading={skills?.length < 1 && loading}
          tableAction={TableAction}
          collection={skills}
          schema={TableSchema}
        />
      </Box>
    </>
  );
}

export default SkillListPage;
