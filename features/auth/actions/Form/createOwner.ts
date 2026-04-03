"use server";

import { adminDb } from "@/lib/firebase/admin";
import { generateUniqueShopId } from "../../utils/generateShopId";

export const createOwner = async (
  email: string,
  name: string,
  shopName: string
) => {
  try {
    console.log("🔥 createOwner start");

    const shopId = await generateUniqueShopId();

    // 🔹 重複チェック（店舗）
    const shopRef = adminDb.collection("shops").doc(shopId);
    const shopSnap = await shopRef.get();

    if (shopSnap.exists) {
      throw new Error("店舗名が既に使用されています");
    }

    // 🍽 店舗作成
    await shopRef.set({
      shopId,
      name: shopName,
      ownerEmail: email,
      createdAt: Date.now(),
    });

    // 👤 オーナー作成
    const ownerRef = adminDb.collection("owners").doc(email);
    await ownerRef.set({
      email,
      name,
      shopId,
      createdAt: Date.now(),
    });

    console.log("✅ createOwner success");

    return {
      success: true,
      owner: {
        email,
        name,
        shopId,
      },
    };
  } catch (error) {
    console.error("❌ createOwner error:", error);
    throw error;
  }
};