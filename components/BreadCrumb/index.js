import styled from "@emotion/styled";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsDot } from "react-icons/bs";

const CustomDot = styled(BsDot)`
  color: rgb(145, 158, 171);
  font-size: 1.5rem;
  margin: 0 0.3rem;
`;

function BreadCrumb({ breadcrumbs, ...props }) {
  const router = useRouter();

  return (
    <Breadcrumbs
      my={1}
      {...props}
      separator={<CustomDot size={18} />}
      aria-label="breadcrumb"
      sx={{
        "	.MuiBreadcrumbs-separator": {
          margin: "0",
        },
      }}
    >
      <Link href="/app" passHref>
        <Typography
          variant="body2"
          color="grey.800"
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Dashboard
        </Typography>
      </Link>
      {breadcrumbs.map((item, index) => {
        const breadText = (
          <Typography
            variant="body2"
            sx={{
              fontWeight: "400",
              cursor: "pointer",
              "&:hover": {
                textDecoration: router.pathname.endsWith(item.href)
                  ? "none"
                  : "underline",
              },
            }}
            color={
              router.pathname.endsWith(item.href) ? "grey.500" : "grey.800"
            }
          >
            {item.label}
          </Typography>
        );
        return router.pathname.endsWith(item.href) ? (
          breadText
        ) : (
          <Link key={index} href={item.href} passHref>
            {breadText}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadCrumb;
