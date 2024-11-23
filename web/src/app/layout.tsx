import "../assets/globals.css";
import type { Metadata } from "next";
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
      </body>
    </html>
  );
}
