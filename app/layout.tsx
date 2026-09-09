import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "URDesigner — Design. Create. Wear. Inspire.",
  description: "Your fashion design studio. Create editable artwork, explore 3D garments, and connect your own AI.",
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
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
