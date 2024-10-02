import { Button } from "@/components/ui/button";
// Importing a custom Button component from the UI folder.

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
// Importing authentication components from Clerk for user state management.

import { Loader } from "lucide-react";
// Importing a Loader component to display a loading spinner during user authentication loading states.

import Image from "next/image";
// Importing Next.js Image component for optimized image rendering.

const Navbar = () => {
  return (
    // Header container for the Navbar
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      {/* Navigation bar flex container for responsive layout */}
      <nav className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        
        {/* Left side: Logo section with image */}
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          {/* Using Next.js Image component for the logo */}
          <Image
            src="/abLanguagesLogo.svg"
            priority
            alt="abLanguagesLogo"
            width={40}
            height={40}
            loading="eager"
          />

          {/* Using standard HTML <img> tag for another image (alternative logo text) */}
          <img src="/abLanguages_logo_text.png" alt="abLanguages" />
        </div>

        {/* Clerk Loading State: Display a spinner while authentication status is loading */}
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        {/* Clerk Loaded State: Display appropriate UI based on user authentication status */}
        <ClerkLoaded>
          {/* If the user is signed in, display a UserButton for profile and logout */}
          <SignedIn>
            {/* UserButton from Clerk for account management (sign-out, profile, etc.) */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* If the user is signed out, display a login button */}
          <SignedOut>
            {/* SignInButton from Clerk to trigger a modal for login/sign-up */}
            <SignInButton
              mode="modal"
              signUpFallbackRedirectUrl="/learn"
              fallbackRedirectUrl="/learn"
            >
              {/* Custom Button with a default size and primary variant */}
              <Button size="default" variant="primary">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </nav>
    </header>
  );
};

export default Navbar;
