"use client";

import { Box } from "@mui/material";
import { Input } from "@/components/layouts/Input";
import { BaseBt } from "@/components/layouts/BaseBt";
import { useTempAuthGuard } from "../hooks/useTempAuthGuard";
import { useRegisterOwner } from "../hooks/useRegisterOwner";

export const RegisterOwnerForm = () => {
  const { user, isLoading } = useTempAuthGuard();
  const { shopName, setShopName, error, onRegister } = useRegisterOwner(user);

  if (isLoading) return null;

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

      <BaseBt onClick={onRegister} title="店舗を登録する" type="submit" />
    </Box>
  );
};
