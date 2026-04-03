"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { Input } from "@/components/layouts/Input";
import { useToastContext } from "@/context/toast/ToastContext";
import { BaseBt } from "@/components/layouts/BaseBt";
import { useLoading } from "@/context/loading/useLoading";
import { getAuthErrorMessage } from "../utils/getAuthErrorMessage";
import { login } from "../actions/login";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToastContext();

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const isLogin = async () => {
    if (!email || !password) {
      setErrors({
        email: !email ? "メールアドレスを入力してください" : undefined,
        password: !password ? "パスワードを入力してください" : undefined,
      });
      return;
    }
    try {
      showLoading();
      setErrors({});

      await login(email, password);

      showSuccessToast("ログインしました");
      router.push("/order-login");
    } catch (error) {
      showErrorToast("ログインに失敗しました");

      if (error instanceof FirebaseError) {
        const message = getAuthErrorMessage(error.code);

        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/user-not-found"
        ) {
          setErrors({ email: message });
        } else if (error.code === "auth/wrong-password") {
          setErrors({ password: message });
        } else {
          setErrors({ email: message });
        }
      }
    } finally {
      hideLoading();
    }
  };

  return (
    <>
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
          id="email"
          label="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <Input
          id="password"
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />

        <BaseBt onClick={isLogin} title="ログイン" />
      </Box>
    </>
  );
};
