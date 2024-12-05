import "../assets/globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import ClientProviders from "@/providers/client-providers";

export const metadata: Metadata = {
  title: "My Blog",
  description: "A blog about technical stuff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
        <Toaster />
      </body>
    </html>
  );
}
