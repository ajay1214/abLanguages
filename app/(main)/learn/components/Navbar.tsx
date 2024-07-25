import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
};

export const Navbar = ({ title }: Props) => {
  return (
    <nav className="sticky top-0 bg-white pb-3 lg:pt-7 lg:-mt-7 flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Link href="/courses">
        {/* <Button variant="defaultOutline" size="sm">
          <ArrowLeft className="h-8 w-10 stroke-2 text-neutral-400" />
        </Button> */}
        <button
          type="button"
          className="bg-white text-center w-40 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
        >
          <div className="bg-sky-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[100px] z-10 duration-500">
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#000000"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              ></path>
              <path
                fill="#000000"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2"></p>
        </button>
      </Link>

      <h1 className="text-3xl font-bold">{title}</h1>

      <div />
    </nav>
  );
};
