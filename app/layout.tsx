import type { Metadata, Viewport } from "next"; // Importing types for Metadata and Viewport from Next.js
import { Montserrat } from "next/font/google"; // Importing the Montserrat font from Google Fonts

import { ClerkProvider } from "@clerk/nextjs"; // Importing ClerkProvider for user authentication

import { Toaster } from "sonner"; // Importing Toaster for displaying notifications

import ExitModal from "@/components/Modals/ExitModal"; // Importing the ExitModal component
import HeartsModal from "@/components/Modals/HeartsModal"; // Importing the HeartsModal component
import PracticeModal from "@/components/Modals/PracticeModal"; // Importing the PracticeModal component

import "./globals.css"; // Importing global CSS styles

const font = Montserrat({ subsets: ["latin"] }); // Initializing the Montserrat font with Latin subset

// Defining metadata for the application
export const metadata: Metadata = {
  title: "abLanguages", // Title of the application
  description: "Achieve fluency in new languages with the help of abLanguages.", // Description of the application
  icons: {
    apple: "/abLanguagesLogo.png", // Icon for Apple devices
    icon: "/abLanguagesLogo.png", // Default icon
  },
};

// Defining viewport settings for responsive design
export const viewport: Viewport = {
  themeColor: "#FFA500", // Theme color for mobile browsers
  width: "device-width", // Setting width to device width
  initialScale: 1, // Initial scale of the viewport
  maximumScale: 1, // Maximum scale of the viewport
  userScalable: false, // Disabling user scaling
  colorScheme: "only light", // Setting color scheme to light only
  viewportFit: "cover", // Ensuring viewport covers the entire screen
};

// Defining the RootLayout component that accepts children as props
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Children prop is expected to be a React node
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#FFA500", // Setting primary color for Clerk components
        },
      }}
    >
      <html lang="en"> {/* Setting the language attribute for the HTML document */}
        <body className={font.className}> {/* Applying the Montserrat font to the body */}
          <Toaster /> {/* Rendering the Toaster component for notifications */}
          <ExitModal /> {/* Rendering the ExitModal component */}
          <HeartsModal /> {/* Rendering the HeartsModal component */}
          <PracticeModal /> {/* Rendering the PracticeModal component */}
          {children} {/* Rendering any child components passed into RootLayout */}
        </body>
      </html>
    </ClerkProvider>
  );
}
