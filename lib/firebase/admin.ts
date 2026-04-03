import admin from "firebase-admin";

console.log("🔥 [Admin Init] 開始");

// ENVチェック（必ずオブジェクト外で）
console.log("🔥 ENV CHECK", {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKeyPreview: process.env.FIREBASE_PRIVATE_KEY?.slice(0, 50),
});

if (!admin.apps.length) {
  console.log("🆕 Firebase Admin 初期化開始");

  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    console.error("❌ ENV不足");
    throw new Error("Firebase Admin ENVが不足しています");
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

  console.log("🔑 privateKey整形後:", privateKey.slice(0, 50));

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });

  console.log("✅ Firebase Admin 初期化成功");
} else {
  console.log("♻️ Firebase Admin 既に初期化済み");
}

export const adminDb = admin.firestore();
console.log("📦 Firestore インスタンス作成完了");