"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { Input } from "@/components/layouts/Input";
import { BaseBt } from "@/components/layouts/BaseBt";
import { useToastContext } from "@/context/toast/ToastContext";
import { useLoading } from "@/context/loading/useLoading";
import { registerOwner } from "../actions/registerOwner";

export const RegisterOwnerForm = () => {
  const router = useRouter();

  const { showLoading, hideLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToastContext();

  const [shopName, setShopName] = useState("");
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null,
  );

  const [error, setError] = useState<string | undefined>();

  // 🔐 仮ログインチェック
  useEffect(() => {
    const tempAuth = localStorage.getItem("tempAuth");

    if (!tempAuth) {
      router.replace("/owner/signup");
      return;
    }

    try {
      const parsed = JSON.parse(tempAuth);
      setUser(parsed);
    } catch {
      router.replace("/owner/signup");
    }
  }, [router]);

  // 登録処理
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

      // 🔥 本登録完了 → tempAuth削除
      localStorage.removeItem("tempAuth");

      // （必要ならここで本ログイン状態を保存）
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        height: "90vh",
      }}
    >
      <Input
        id="shopName"
        label="店舗名"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
        error={!!error}
        helperText={error}
      />

      <BaseBt onClick={onRegister} type="submit" title="店舗を登録する" />
    </Box>
  );
};
