import React from "react";

import { toast, Toaster, ToastBar } from "react-hot-toast";
import {
  BsExclamationTriangleFill,
  BsFillCheckCircleFill,
  BsInfoCircleFill,
} from "react-icons/bs";

function AppToast({ position = "top-right" }) {
  return (
    <Toaster
      position={position}
      toastOptions={{
        success: {
          icon: <BsFillCheckCircleFill />,
        },
        info: {
          duration: 5000,
          icon: <BsInfoCircleFill />,
        },
        warning: {
          duration: 5000,
          icon: <BsExclamationTriangleFill />,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {console.log(t.type)}
              {icon}
              {message}
              {t.type !== "loading" && (
                <button onClick={() => toast.dismiss(t.id)}>X</button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

export default AppToast;
