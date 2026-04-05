"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/layouts/Input";
import { useToastContext } from "@/context/toast/ToastContext";
import { BaseBt } from "@/components/layouts/BaseBt";
import { useLoading } from "@/context/loading/useLoading";
import { confirmOwnerOtp } from "../actions/confirmOwnerOtp";
import { requestOwnerOtp } from "../actions/requestOwnerOtp";

export const ConfirmOwnerForm = () => {
  const [otp, setOtp] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";

  const { showLoading, hideLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToastContext();

  const [error, setError] = useState<string | undefined>();

  const onConfirm = async () => {
    if (!otp) {
      setError("認証コードを入力してください");
      return;
    }

    try {
      showLoading();
      setError(undefined);

      const res = await confirmOwnerOtp(email, otp);

      localStorage.setItem("tempAuth", JSON.stringify(res.user));

      showSuccessToast("認証に成功しました");

      router.push("/owner/setup");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "期限切れです") {
          setError("認証コードの有効期限が切れています");
        } else if (error.message === "OTPが違います") {
          setError("認証コードが正しくありません");
        } else {
          setError("認証に失敗しました");
        }
      } else {
        setError("認証に失敗しました");
      }

      showErrorToast("認証に失敗しました");
    } finally {
      hideLoading();
    }
  };

  const onResend = async () => {
    if (!email || !name) return;

    try {
      showLoading();

      await requestOwnerOtp(email, name);

      showSuccessToast("認証コードを再送信しました");
    } catch (error) {
      console.error(error);
      showErrorToast("再送信に失敗しました");
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
        id="otp"
        label="認証コード"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        error={!!error}
        helperText={error}
      />

      <BaseBt onClick={onConfirm} type="submit" title="認証する" />

      <BaseBt type="button" title="認証コードを再送信" onClick={onResend} />
    </Box>
  );
};
