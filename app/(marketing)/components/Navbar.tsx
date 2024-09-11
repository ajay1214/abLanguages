import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <nav className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image
            src="/abLanguagesLogo.svg"
            priority
            alt="abLanguagesLogo"
            width={40}
            height={40}
            loading="eager"
          />
          {/* <h1 className="text-2xl font-extrabold text-purple-600 tracking-wide">
            abLanguages
          </h1> */}
          <img src="/abLanguages_logo_text.png" alt="abLanguages" />
        </div>

        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton
              mode="modal"
              signUpFallbackRedirectUrl="/learn"
              fallbackRedirectUrl="/learn"
            >
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
