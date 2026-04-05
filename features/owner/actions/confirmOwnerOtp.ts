"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function confirmOwnerOtp(email: string, otp: string) {
  const record = await prisma.otp.findUnique({ where: { email } });

  if (!record) {
    throw new Error("OTPが違います");
  }

  if (record.expiresAt < new Date()) {
    await prisma.otp.delete({ where: { email } }).catch(() => {});
    throw new Error("期限切れです");
  }

  const isValid = await bcrypt.compare(otp, record.hashedOtp);
  if (!isValid) {
    throw new Error("OTPが違います");
  }

  // 検証成功 → OTP削除
  await prisma.otp.delete({ where: { email } }).catch(() => {});

  return {
    user: {
      email: record.email,
      name: record.name,
    },
  };
}