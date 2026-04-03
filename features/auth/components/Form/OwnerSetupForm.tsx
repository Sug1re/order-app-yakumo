"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { Input } from "@/components/layouts/Input";
import { BaseBt } from "@/components/layouts/BaseBt";
import { useToastContext } from "@/context/toast/ToastContext";
import { useLoading } from "@/context/loading/useLoading";
import { useTempAuthGuard } from "@/features/auth/hooks/useTempAuthGuard";
import { createOwner } from "../../actions/Form/createOwner";

export const OwnerSetupForm = () => {
  const router = useRouter();

  const { user } = useTempAuthGuard();

  const { showLoading, hideLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToastContext();

  const [shopName, setShopName] = useState("");
  const [error, setError] = useState<string | undefined>();

  const isSetup = async () => {
    if (!shopName) {
      setError("店舗名を入力してください");
      return;
    }

    if (!user) return;

    try {
      showLoading();
      setError(undefined);

      console.log("📡 createOwner call");

      const res = await createOwner(user.email, user.name, shopName);

      console.log("✅ createOwner success");

      // 🟢 本ログイン状態
      localStorage.setItem("owner", JSON.stringify(res.owner));

      // 🧹 仮ログイン削除
      localStorage.removeItem("tempAuth");

      showSuccessToast("登録が完了しました");

      // 🚀 ダッシュボードへ
      router.push("/owner/dashboard");
    } catch (error) {
      console.error("❌ setup error:", error);

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

      <BaseBt onClick={isSetup} title="登録する" />
    </Box>
  );
};
