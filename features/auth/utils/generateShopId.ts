import { clientDb } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";

export const generateShopId = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 4; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
};

export const generateUniqueShopId = async () => {
  const maxTry = 10;

  for (let i = 0; i < maxTry; i++) {
    const id = generateShopId();

    const ref = doc(clientDb, "shops", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return id;
    }
  }

  throw new Error("店舗IDの生成に失敗しました");
};