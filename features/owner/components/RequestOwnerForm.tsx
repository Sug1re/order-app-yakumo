"use client";

import { Box } from "@mui/material";
import { Input } from "@/components/layouts/Input";
import { BaseBt } from "@/components/layouts/BaseBt";
import { useRequestOwner } from "../hooks/useRequestOwner";

export const RequestOwnerForm = () => {
  const { email, setEmail, name, setName, errors, onRequest } =
    useRequestOwner();

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

      <BaseBt onClick={onRequest} title="新規登録" type="submit" />
    </Box>
  );
};
