"use server";

import { adminDb } from "@/lib/firebase/admin";
import { OtpData } from "../../types/opt";

export const verifyOtp = async (email: string, inputOtp: string) => {
  console.log("🚀 verifyOtp start", { email, inputOtp });

  try {
    // 🔍 OTP取得
    const ref = adminDb.collection("otp").doc(email);
    console.log("📄 doc ref created");

    const snap = await ref.get();
    console.log("📥 getDoc result:", snap.exists);

    if (!snap.exists) {
      console.error("❌ OTPが存在しません");
      throw new Error("OTPが存在しません");
    }

    const data = snap.data() as OtpData;
    console.log("📦 OTP data:", data);

    // ⏰ 期限チェック
    console.log("⏰ 現在時刻:", Date.now(), "期限:", data?.expiresAt);
    if (Date.now() > data.expiresAt) {
      console.warn("⚠️ OTP期限切れ");

      await ref.delete();
      console.log("🗑 期限切れOTP削除完了");

      throw new Error("期限切れです");
    }

    // 🔑 OTPチェック
    console.log("🔑 入力OTP:", inputOtp, "保存OTP:", data.otp);
    if (data.otp !== inputOtp) {
      console.error("❌ OTP不一致");
      throw new Error("OTPが違います");
    }

    console.log("✅ OTP一致");

    // 🗑 成功したら削除
    await ref.delete();
    console.log("🗑 OTP削除完了");

    // 👤 ユーザー確認
    const userRef = adminDb.collection("owners").doc(email);
    console.log("👤 userRef作成");

    const userSnap = await userRef.get();
    console.log("📥 user exists:", userSnap.exists);

    if (!userSnap.exists) {
      console.log("🆕 ユーザー作成開始");

      await userRef.set({
        email,
        name: data.name,
        createdAt: Date.now(),
      });

      console.log("✅ ユーザー作成完了");
    } else {
      console.log("ℹ️ 既存ユーザー");
    }

    console.log("🎉 verifyOtp success");

    return {
      success: true,
      user: {
        email,
        name: data.name,
      },
    };

  } catch (error) {
    console.error("🔥 verifyOtp error:", error);
    throw error;
  }
};