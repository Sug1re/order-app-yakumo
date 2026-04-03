"use server";

import { Resend } from "resend";
import { randomInt } from "crypto";
import { clientDb } from "@/lib/firebase/client";
import { doc, setDoc } from "firebase/firestore";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtp = async (email: string, name: string) => {
    const otp = randomInt(100000, 999999).toString();

    await setDoc(doc(clientDb, "otp", email), {
      otp,
      name,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "認証コード",
      html: `
        <h2>認証コード</h2>
        <p>ログインURL:</p>
        <a href="http://localhost:3000/auth/owner/verify?email=${email}&name=${name}">
          ログインはこちら
        </a>

        <p>ワンタイムパスワード: ${otp}</p>
        <p>5分以内に入力してください</p>
        <p>※このメールは送信専用です。ご返信いただいてもお答えできませんのでご了承下さい。<br />※このメールにお心当たりのない場合は、URLにアクセスせずメールを破棄してください。</p>
      `,
    });


    return { success: true };
};