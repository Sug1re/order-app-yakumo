"use client";

import React from "react";
import { ToastContext } from "../toast/ToastContext";
import { useToast } from "../../features/toast/hooks/useToast";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { showSuccessToast, showErrorToast, Toast } = useToast();

  return (
    <ToastContext.Provider value={{ showSuccessToast, showErrorToast }}>
      {children}
      {Toast}
    </ToastContext.Provider>
  );
};
