import "./globals.css";
import type { Metadata } from "next";
import { ThemeRegistry } from "@/components/providers/ThemeRegistry";
import { ToastProvider } from "@/context/toast/ToastProvider";
import { LoadingProvider } from "@/context/loading/LoadingProvider";

export const metadata: Metadata = {
  title: "八雲",
  description: "注文アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ThemeRegistry>
          <ToastProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </ToastProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
