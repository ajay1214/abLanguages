import { Button } from "@/components/ui/button";
// Importing the custom Button component from the UI components.

import {
  ClerkLoaded, 
  ClerkLoading, 
  SignInButton, 
  SignUpButton, 
  SignedIn, 
  SignedOut
} from "@clerk/nextjs";
// Importing authentication UI components from Clerk for managing sign-in and sign-up functionalities.

import { Loader } from "lucide-react";
// Importing a Loader icon for displaying a loading animation during authentication states.

import Image from "next/image";
// Importing the Next.js Image component for optimized image rendering.

import Link from "next/link";
// Importing Next.js Link for client-side navigation.

import { Globe } from "lucide-react";
// Importing the Globe icon from the lucide-react library for visual effects.

import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
// Importing an animated title component for visual enhancements in the hero section.

const Hero = () => {
  return (
    <>
      {/* Hero Image Container */}
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        {/* Next.js Image component for optimized image loading and rendering */}
        <Image
          src="abLanguagesLogo.svg"
          priority
          fill
          alt="Hero"
          loading="eager"
        />
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col items-center gap-y-8">
        {/* Title with Animated Text */}
        <AnimatedTitle>
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
            <span>
              Achieve fluency in new{" "}
              {/* Highlighted word for 'language' */}
              <span className="rounded-full border border-highlight/25 bg-highlight/50 px-[0.35em] py-[0.125em] text-highlight-depth dark:bg-highlight/85 dark:text-background">
                language
              </span>
              with the help of abLanguages.
            </span>
            <span className="flex flex-wrap items-center justify-center">
              Learn{" "}
              {/* Globe icon with an animation */}
              <span className="group relative ml-[0.25em] flex h-[1.35em] w-[1.5em] items-center justify-center rounded-full bg-secondary/30 dark:text-secondary">
                <Globe
                  className="z-1 h-[1.25em] w-[1.25em] group-hover:animate-spin-slow"
                  strokeWidth={2.15}
                />
              </span>
              <span className="mr-[0.25em]">
                <span className="sr-only">on</span>
                <span className="lowercase" aria-hidden="true">
                  n
                </span>
              </span>{" "}
              the go.
            </span>
          </h1>
        </AnimatedTitle>

        {/* Authentication Buttons and Loading State */}
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          {/* Displaying a loading spinner when Clerk is in a loading state */}
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>

          {/* Clerk Loaded: Display Sign-in/Sign-up buttons based on authentication state */}
          <ClerkLoaded>
            {/* If the user is signed out, show Sign Up and Sign In buttons */}
            <SignedOut>
              <SignUpButton
                mode="modal"
                signInFallbackRedirectUrl="/learn"
                fallbackRedirectUrl="/learn"
              >
                {/* Get Started button for sign-up */}
                <button className="hero-resume-button">
                  Get Started
                </button>
              </SignUpButton>

              <SignInButton
                mode="modal"
                signUpFallbackRedirectUrl="/learn"
                fallbackRedirectUrl="/learn"
              >
                {/* Already have an account button for sign-in */}
                <Button className="w-full" size="lg" variant="primaryOutline">
                  Already have an account
                </Button>
              </SignInButton>
            </SignedOut>

            {/* If the user is signed in, display a "Resume your learning" button */}
            <SignedIn>
              <button className="hero-resume-button">
                <Link href="/learn">Resume your learning 😀</Link>
              </button>
            </SignedIn>
          </ClerkLoaded>

          {/* Test account credentials placeholder for easy access */}
          <p className="mt-3">test123@gmail.com, test1234</p>
        </div>
      </div>
    </>
  );
};

export default Hero;
// Exporting the Hero component for use in other parts of the application.
