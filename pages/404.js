import React from "react";
import { errorLayout } from "./layout/error";

function Custom404() {
  return <div>Custom404</div>;
}

Custom404.getLayout = errorLayout;

export default Custom404;
