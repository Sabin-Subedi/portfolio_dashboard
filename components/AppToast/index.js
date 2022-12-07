import { IconButton, Typography } from "@mui/material";
import React from "react";

import { toast, Toaster, ToastBar } from "react-hot-toast";
import {
  BsExclamationCircleFill,
  BsFillCheckCircleFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { HiExclamationTriangle } from "react-icons/hi2";
import ToastIcon from "./ToastIcon";

const toastConfig = {
  duration: 5000,
};

function AppToast({ position = "top-right" }) {
  return (
    <Toaster
      position={position}
      toastOptions={{
        success: {
          duration: toastConfig.duration,
          icon: <BsFillCheckCircleFill />,
        },
        info: {
          duration: toastConfig.duration,
          icon: <BsInfoCircleFill />,
        },
        warning: {
          duration: toastConfig.duration,
          icon: <HiExclamationTriangle />,
        },
        error: {
          duration: toastConfig.duration,
          icon: <BsExclamationCircleFill />,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              <ToastIcon type={t.type} icon={icon} />
              <Typography variant="body1" color="grey.800">
                {message}
              </Typography>
              {t.type !== "loading" && (
                <IconButton
                  onClick={() => toast.dismiss(t.id)}
                  size="small"
                  aria-label="close"
                >
                  <FiX />
                </IconButton>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

export default AppToast;
