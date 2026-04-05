"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useTempAuthGuard = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tempAuth = localStorage.getItem("tempAuth");

    if (!tempAuth) {
      router.replace("/owner/request");
      return;
    }

    try {
      const parsed = JSON.parse(tempAuth);
      setUser(parsed);
    } catch {
      router.replace("/owner/request");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return { user, isLoading };
};