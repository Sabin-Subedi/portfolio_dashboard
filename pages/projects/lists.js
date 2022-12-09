import { Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { FiPlus } from "react-icons/fi";
import AppTable from "../../components/AppTable";
import PageHeader from "../../components/PageHeader";

function ProjectsPage() {
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
