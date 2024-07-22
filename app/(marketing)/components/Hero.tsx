import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Globe } from 'lucide-react'
import { AnimatedTitle } from "@/components/motion/AnimatedTitle";

const Hero = () => {
  return (
    <>
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="hero.svg" priority fill alt="Hero" loading="eager" />
      </div>

      <div className="flex flex-col items-center gap-y-8">
        <AnimatedTitle>
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          <span>
          Learn, Practice and master new {' '}
            <span className="rounded-full border border-highlight/25 bg-highlight/50 px-[0.35em] py-[0.125em] text-highlight-depth dark:bg-highlight/85 dark:text-background">
              language
            </span>
            with abLanguages.
          </span>
          <span className="flex flex-wrap items-center justify-center">
            Learn{' '}
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
            </span>{' '}
            the go.
          </span> 
        </h1>
        </AnimatedTitle>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>

          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                signInFallbackRedirectUrl="/learn"
                fallbackRedirectUrl="/learn"
              >
                <Button className="w-full" size="lg" variant="secondary">
                  Get Started
                </Button>
              </SignUpButton>

              <SignInButton
                mode="modal"
                signUpFallbackRedirectUrl="/learn"
                fallbackRedirectUrl="/learn"
              >
                <Button className="w-full" size="lg" variant="primaryOutline">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button className="w-full" size="lg" variant="secondary" asChild>
                <Link href="/learn">Continue learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </>
  );
};

export default Hero;
