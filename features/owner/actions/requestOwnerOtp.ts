"use server";

import { prisma } from "@/lib/prisma";
import  bcrypt from "bcryptjs";
import { Resend } from "resend";
import crypto from "node:crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function requestOwnerOtp(email: string, name: string) {
  if (!email || !name) {
    throw new Error("メールアドレスと名前は必須です");
  }

  // 6桁OTP生成
  const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = await bcrypt.hash(otp, 12);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5分有効

  // DBに保存（既存なら更新）
  await prisma.otp.upsert({
    where: { email },
    update: { name, hashedOtp, expiresAt },
    create: { email, name, hashedOtp, expiresAt },
  });

  // Resendでメール送信
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // Resendで検証済みのFromアドレスに変更・のちに変更
      to: email,
      subject: "【八雲】認証コードのご案内",
      html: `
        <h1>認証コード</h1>
        <p>${name} 様</p>
        <p>以下の6桁の認証コードを入力してください。</p>
        <h2 style="font-size: 48px; letter-spacing: 10px; font-weight: bold;">${otp}</h2>
        <p>このコードの有効期限は<strong>5分</strong>です。</p>

        <a href="http://localhost:3000/owner/confirm?email=${email}&name=${name}">
          認証コードを入力する
        </a>
        <p>心当たりがない場合は、このメールを無視してください。</p>
      `,
    });
  } catch (err) {
    console.error("Resend error:", err);
    throw new Error("メール送信に失敗しました");
  }
}