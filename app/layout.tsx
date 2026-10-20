import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StarLink Components",
  description: "Global stocking distributor of electronic components.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
