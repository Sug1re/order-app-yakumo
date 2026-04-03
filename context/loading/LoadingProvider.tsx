"use client";

import { useState, ReactNode } from "react";
import { Loading } from "@/components/elements/Loading";
import { LoadingContext } from "./LoadingContext";

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {loading && <Loading />}
    </LoadingContext.Provider>
  );
};
