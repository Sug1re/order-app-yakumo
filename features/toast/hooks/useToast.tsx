"use client";

import React, { useState, useCallback } from "react";
import { Snackbar, Alert, Slide } from "@mui/material";
import type { SlideProps } from "@mui/material";
import { useDisclosure } from "@mantine/hooks";

type ToastSeverity = "success" | "error";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export const useToast = () => {
  const [isOpen, handlers] = useDisclosure(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<ToastSeverity>("success");

  const showToast = useCallback(
    (msg: string, sev: ToastSeverity) => {
      setMessage(msg);
      setSeverity(sev);
      handlers.open();
    },
    [handlers],
  );

  const showSuccessToast = useCallback(
    (msg: string) => {
      showToast(msg, "success");
    },
    [showToast],
  );

  const showErrorToast = useCallback(
    (msg: string) => {
      showToast(msg, "error");
    },
    [showToast],
  );

  const Toast = (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handlers.close}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
      sx={{
        "& .MuiSnackbarContent-root": {
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        },
      }}
    >
      <Alert
        severity={severity}
        onClose={handlers.close}
        sx={{
          width: "100%",
          fontWeight: "bold",
          border: "1px solid #060666ff",
          backgroundColor: "#ffffff",
          color: "#000000",
          "& .MuiAlert-icon": {
            color: "#060666ff",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return {
    showSuccessToast,
    showErrorToast,
    Toast,
  };
};
