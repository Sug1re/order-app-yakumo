"use client";

import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/layouts/Input";
import { BaseBt } from "@/components/layouts/BaseBt";
import { useConfirmOwner } from "../hooks/useConfirmOwner";

export const ConfirmOwnerForm = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const name = searchParams.get("name") || "";

  const { otp, setOtp, error, onConfirm, onResend } = useConfirmOwner(
    email,
    name,
  );

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

      <BaseBt onClick={onConfirm} title="認証する" type="submit" />

      <BaseBt onClick={onResend} title="認証コードを再送信" type="button" />
    </Box>
  );
};
