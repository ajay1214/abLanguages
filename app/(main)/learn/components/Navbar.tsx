import Link from "next/link"; // Import Link component for client-side navigation
import { ArrowLeft } from "lucide-react"; // Import icon (commented out in this case)
import { Button } from "@/components/ui/button"; // Import custom Button component

// Define Props type to specify properties accepted by Navbar component
type Props = {
  title: string; // Navbar takes a title as a prop to display
};

// Navbar component definition
export const Navbar = ({ title }: Props) => {
  return (
    <nav className="sticky top-0 bg-white pb-3 lg:pt-7 lg:-mt-7 flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Link href="/courses">
        {/* Custom button that navigates to "/courses" */}
        {/* The previous Button and ArrowLeft icon were commented out, replaced by a custom button below */}
        <button
          type="button"
          className="bg-white text-center w-40 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
        >
          {/* This div represents the background with animation when button is hovered */}
          <div className="bg-sky-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[100px] z-10 duration-500">
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Icon definition for arrow, using inline SVG for a custom design */}
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
          <p className="translate-x-2"></p> {/* Placeholder for additional text inside button */}
        </button>
      </Link>

      {/* Navbar title, centrally placed and dynamically set based on prop */}
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* Empty div to maintain flex alignment for spacing */}
      <div />
    </nav>
  );
};
