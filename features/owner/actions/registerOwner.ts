"use server";

import { prisma } from "@/lib/prisma";

export async function registerOwner(email: string, name: string, shopName: string) {
  // 重複チェック
  const existing = await prisma.owner.findUnique({ where: { email } });
  if (existing) {
    throw new Error("このメールアドレスは既に登録されています");
  }

const result = await prisma.owner.create({
    data: {
    email,
    name,
    shop: {
        create: {
        name: shopName,
        },
    },
    },
    include: {
    shop: true,
    },
});

const shop = result.shop!;

return {
    owner: {
    id: result.id,
    email: result.email,
    name: result.name,
    shopId: shop.id,
    shopName: shop.name,
    },
};
}