"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { Input } from "@/components/layouts/Input";
import { useToastContext } from "@/context/toast/ToastContext";
import { BaseBt } from "@/components/layouts/BaseBt";
import { useLoading } from "@/context/loading/useLoading";
import { sendOtp } from "../../actions/Form/sendOtp";

export const OwnerSignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const { showLoading, hideLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToastContext();

  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
  }>({});

  const isSignup = async () => {
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

      await sendOtp(email, name);

      showSuccessToast("認証コードを送信しました");

      router.push(`/auth/owner/verify?email=${email}&name=${name}`);
    } catch {
      showErrorToast("送信に失敗しました");
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
        id="name"
        label="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
      />

      <Input
        id="email"
        label="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />

      <BaseBt onClick={isSignup} title="新規登録" />
    </Box>
  );
};
