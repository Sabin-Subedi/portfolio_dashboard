import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import BreadCrumb from "../../components/BreadCrumb";

function TodoPage() {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Todo List
      </Typography>
      <BreadCrumb breadcrumbs={[{ label: "Todo List", href: "/todo" }]} />
    </div>
  );
}

export default TodoPage;
