"use client";

import { createContext, useContext } from "react";

export type ToastContextType = {
  showSuccessToast: (msg: string) => void;
  showErrorToast: (msg: string) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToastContext must be used within ToastProvider");
  }
  return ctx;
};