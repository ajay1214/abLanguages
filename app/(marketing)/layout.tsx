import { Metadata } from "next"; // Importing Metadata type from Next.js for SEO

import Footer from "@/app/(marketing)/components/Footer"; // Importing Footer component
import Navbar from "@/app/(marketing)/components/Navbar"; // Importing Navbar component

export const metadata: Metadata = {
  title: "abLanguages | Home page", // Setting the page title
  description: "Achieve fluency in new languages with the help of abLanguages.", // Setting the page description
};

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col"> {/* Main container to ensure full-screen layout */}
      <section className="flex flex-col flex-1 items-center justify-center"> {/* Section to hold the Navbar, content, and Footer */}
        <Navbar /> {/* Navbar component */}
        {children} {/* Render children passed to this layout */}
        <Footer /> {/* Footer component */}
      </section>
    </main>
  );
};
export default MarketingLayout;
