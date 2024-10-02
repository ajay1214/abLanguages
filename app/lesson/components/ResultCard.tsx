import { FC } from "react"; // Importing the FC (Functional Component) type from React
import Image from "next/image"; // Importing the Image component from Next.js for optimized image rendering
import { InfinityIcon } from "lucide-react"; // Importing the InfinityIcon from lucide-react library for the "active" status
import { cn } from "@/lib/utils"; // Importing a utility function for conditional className concatenation

// Defining the props interface for the ResultCard component
interface ResultCardProps {
  value: number | "active"; // 'value' can be either a number or the string "active"
  variant: "points" | "hearts"; // 'variant' can be either "points" or "hearts", determining the styling
}

// Defining the ResultCard functional component
const ResultCard: FC<ResultCardProps> = ({ value, variant }) => {
  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full", // Common classes for the card's container
        variant === "points" && "bg-orange-400 border-orange-400", // Conditional class for the points variant
        variant === "hearts" && "bg-rose-400 border-rose-400" // Conditional class for the hearts variant
      )}
    >
      <div
        className={cn(
          "text-white p-1.5 rounded-t-xl font-bold text-center uppercase text-xs", // Common classes for the header section
          variant === "hearts" && "bg-red-500", // Conditional class for hearts header background
          variant === "points" && "bg-orange-500" // Conditional class for points header background
        )}
      >
        {variant === "hearts" ? "Heart Left" : "Total XP"} {/* Displaying the correct header text based on the variant */}
      </div>

      <div
        className={cn(
          "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg", // Common classes for the content area
          variant === "hearts" && "text-red-500", // Conditional text color for hearts variant
          variant === "points" && "text-orange-500" // Conditional text color for points variant
        )}
      >
        <Image
          src={variant === "hearts" ? "/heart.svg" : "/points.svg"} // Displaying the correct icon based on the variant
          alt="Icon"
          height={30}
          width={30}
          className="mr-1.5" // Adding margin to the right of the image
        />
        {value === "active" ? ( // If the value is "active", show the Infinity icon
          <InfinityIcon className="h-6 w-6 stroke-[3] shrink-0" /> // Infinity icon styling
        ) : (
          value // Otherwise, display the value directly
        )}
      </div>
    </div>
  );
};

export default ResultCard; // Exporting the ResultCard component as default
