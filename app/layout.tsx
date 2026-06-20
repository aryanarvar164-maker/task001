import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Project 001 — Contact",
  description: "A contact form built with Next.js, Tailwind, and shadcn/ui.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
