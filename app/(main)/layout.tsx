import { MobileSidebar } from "@/components/MobileHeader"; // Sidebar for mobile view
import { Sidebar } from "@/components/Sidebar"; // Sidebar for desktop view
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"; // Clerk components for authentication, including user profile button and loading states
import { Loader } from "lucide-react"; // Importing a loading spinner icon from lucide-react

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Mobile Sidebar will be visible only on mobile devices */}
      <MobileSidebar />

      {/* Sidebar is hidden on mobile (hidden) and shown on larger screens (lg:flex) */}
      <Sidebar className="hidden lg:flex" />

      {/* Main content area, with sidebar width considered on larger screens */}
      <main className="lg:ml-[256px] h-full pt-12 lg:pt-0">
        <section className="h-full max-w-[1056px] pt-6 mx-auto">
          {children} {/* Renders the child components (page-specific content) */}
        </section>
      </main>

      {/* User profile button for mobile screens, fixed at the bottom-right */}
      <section className="fixed bottom-6 right-5 block lg:hidden">
        {/* Shows loading spinner while Clerk authentication is loading */}
        <ClerkLoading>
          <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        {/* User button appears after Clerk has loaded, with sign-out functionality */}
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" /> {/* Redirects to home after signing out */}
        </ClerkLoaded>
      </section>
    </>
  );
};

export default MainLayout;
