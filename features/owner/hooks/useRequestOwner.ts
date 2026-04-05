"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestOwnerOtp } from "../actions/requestOwnerOtp";
import { useLoading } from "@/context/loading/useLoading";
import { useToastContext } from "@/context/toast/ToastContext";


export const useRequestOwner = () => {
  const router = useRouter();
    const { showLoading, hideLoading } = useLoading();
    const { showSuccessToast, showErrorToast } = useToastContext();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
  }>({});

  const onRequest = async () => {
    if (!email || !name) {
      setErrors({
        email: !email ? "メールアドレスを入力してください" : undefined,
        name: !name ? "名前を入力してください" : undefined,
      });
      return;
    }

    try {
      showLoading();
      setErrors({});

      await requestOwnerOtp(email, name);

      showSuccessToast("認証コードを送信しました");

      router.push(`/owner/confirm?email=${email}&name=${name}`);
    } catch (error) {
      console.error(error);
      showErrorToast("送信に失敗しました");
    } finally {
      hideLoading();
    }
  };

  return {
    email,
    setEmail,
    name,
    setName,
    errors,
    onRequest,
  };
};