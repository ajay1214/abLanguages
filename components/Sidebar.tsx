import Image from "next/image";
import Link from "next/link";

import { sidebarItems } from "@/constants";
import { isAdmin } from "@/lib/admin";
import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import DownloadAppButton from "./DownloadAppButton";
import { SidebarItem } from "./SidebarItem";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => (
  <aside
    className={cn(
      "h-full lg:w-[256px] lg:fixed flex left-0 top-0 px-4 border-r-2 flex-col",
      className
    )}
  >
    <Link href="/">
      <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
        <Image src="/abLanguagesLogo.svg" priority alt="abLanguagesLogo" width={40} height={40} />
        <h1 className="text-2xl font-extrabold text-orange-600 tracking-wide">
          abLanguages
        </h1>
      </div>
    </Link>

    <div className="flex flex-col gap-y-4 flex-1">
      {sidebarItems.map((item) => (
        <SidebarItem
          label={item.label}
          href={item.link}
          iconSrc={item.iconSrc}
          key={item.label}
        />
      ))}

      {isAdmin() && (
        <SidebarItem label="Admin" href="/admin" iconSrc="/abLanguagesLogo.svg" />
      )}
    </div>

    <div className="py-4 px-2 flex justify-between items-center">
      <ClerkLoading>
        <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
      </ClerkLoading>

      <ClerkLoaded>
        <div className="hidden lg:block">
          <UserButton afterSignOutUrl="/" />
        </div>

        <DownloadAppButton />
      </ClerkLoaded>
    </div>

    <div className="flex flex-col items-center max-[380px]:text-xs text-sm lg:text-xs mb-1 pt-4 border-t-2">
      <p className="whitespace-nowrap justify-center flex items-center gap-1">
        Made with
        <Image
          src="/heart.svg"
          alt="Love"
          height={10}
          width={10}
          className="animate-ping inline mx-1"
        />
        by{" "}
        <span className="green-text-gradient font-black">
          Ajay
        </span>
      </p>

      <p className="whitespace-nowrap">
        &copy; {new Date().getFullYear()}
      </p>
      <div className="hidden lg:flex flex-row w-auto p-2">
          <Link href="https://github.com/ajay1214" aria-label="GitHub">
            <GitHubLogoIcon className="w-4 h-4 mr-2 hover:text-orange-500" />
          </Link>
          <Link
            href="https://www.instagram.com/ajay_bind786/"
            aria-label="Instagram"
          >
            <InstagramLogoIcon className="w-4 h-4 mr-2 hover:text-orange-500" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/ajaybind/"
            aria-label="LinkedIn"
          >
            <LinkedInLogoIcon className="w-4 h-4 mr-2 hover:text-orange-500" />
          </Link>
        </div>
    </div>
  </aside>
);
