import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "sonner";

import ExitModal from "@/components/Modals/ExitModal";
import HeartsModal from "@/components/Modals/HeartsModal";
import PracticeModal from "@/components/Modals/PracticeModal";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "abLanguages",
  description: "Achieve fluency in new languages with the help of abLanguages.",
  icons: {
    apple: "/abLanguagesLogo.png",
    icon: "/abLanguagesLogo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFA500",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "only light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#FFA500",
        },
      }}
    >
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
