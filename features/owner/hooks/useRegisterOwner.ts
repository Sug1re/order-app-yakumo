"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerOwner } from "../actions/registerOwner";
import { useLoading } from "@/context/loading/useLoading";
import { useToastContext } from "@/context/toast/ToastContext";

export const useRegisterOwner = (user: {
  email: string;
  name: string;
} | null) => {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToastContext();

  const [shopName, setShopName] = useState("");
  const [error, setError] = useState<string | undefined>();

  const onRegister = async () => {
    if (!shopName) {
      setError("店舗名を入力してください");
      return;
    }

    if (!user) return;

    try {
      showLoading();
      setError(undefined);

      const res = await registerOwner(user.email, user.name, shopName);

      localStorage.removeItem("tempAuth");
      localStorage.setItem("owner", JSON.stringify(res.owner));

      showSuccessToast("店舗登録が完了しました");

      router.push("/owner/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("登録に失敗しました");
      }

      showErrorToast("登録に失敗しました");
    } finally {
      hideLoading();
    }
  };

  return {
    shopName,
    setShopName,
    error,
    onRegister,
  };
};