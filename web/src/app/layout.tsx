import type { Metadata } from "next";
import "../assets/globals.css";

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
      <body>{children}</body>
    </html>
  );
}
