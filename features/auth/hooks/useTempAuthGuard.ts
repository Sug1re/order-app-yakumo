"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TempAuthUser } from "../types/tempAuth";

export const useTempAuthGuard = () => {
  const router = useRouter();

  const [user] = useState<TempAuthUser | null>(() => {
    if (typeof window === "undefined") return null;

    const tempAuth = localStorage.getItem("tempAuth");
    return tempAuth ? JSON.parse(tempAuth) : null;
  });

  useEffect(() => {
    if (!user) {
      router.replace("/auth/owner/signup");
    }
  }, [user, router]);

  return { user };
};