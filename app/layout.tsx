import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Who Follows? — See what changed",
  description: "Compare Instagram Followers and Following snapshots without sharing your Instagram password.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
