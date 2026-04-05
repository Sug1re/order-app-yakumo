"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { confirmOwnerOtp } from "../actions/confirmOwnerOtp";
import { requestOwnerOtp } from "../actions/requestOwnerOtp";
import { useLoading } from "@/context/loading/useLoading";
import { useToastContext } from "@/context/toast/ToastContext";

export const useConfirmOwner = (
  email: string,
  name: string,
) => {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToastContext();

  const [otp, setOtp] = useState("");
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

      router.push("/owner/register");
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

  return {
    otp,
    setOtp,
    error,
    onConfirm,
    onResend,
  };
};