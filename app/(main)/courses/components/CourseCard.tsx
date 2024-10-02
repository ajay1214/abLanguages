import { cn } from "@/lib/utils"; // Utility function for conditional class names
import { Check } from "lucide-react"; // Lucide-react icon component for the checkmark
import Image from "next/image"; // Next.js optimized image component

type Props = {
  title: string; // Course title
  id: number; // Course ID to identify which course is clicked
  imgSrc: string; // Image source URL for the course
  handleClick: (id: number) => void; // Function to handle click event, passing the course ID
  disabled?: boolean; // Optional prop to disable the card if necessary
  active?: boolean; // Optional prop to indicate if the course is active
};

// Functional component definition for CourseCard
export const CourseCard = ({
  title,
  id,
  imgSrc,
  handleClick,
  disabled,
  active,
}: Props) => {
  return (
    <div
      // Calls handleClick with the course ID when the card is clicked
      onClick={() => handleClick(id)}
      className={cn(
        // Dynamic class names based on the state of the card (disabled, active, etc.)
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 w-full min-h-[150px] lg:min-h-[217px] lg:min-w-[200px]",
        disabled && "pointer-events-none opacity-50" // Adds opacity and disables click if disabled
      )}
    >
      <div className="min-h-[24px] w-full flex items-center justify-end">
        {active && (
          // Displays checkmark icon if the course is active
          <div className="rounded-md bg-orange-600 flex items-center justify-center p-1.5">
            <Check className="text-white stroke-[4] h-4 w-4" />
          </div>
        )}
      </div>

      <Image
        src={imgSrc} // Source URL for the course image
        alt={title} // Alt text for accessibility and SEO
        width={93.33} // Specifies the width of the image
        height={70} // Specifies the height of the image
        className="rounded-lg drop-shadow-md border object-cover" // Styling for the image (shadow, border, etc.)
      />

      {/* Displays the course title */}
      <p className="text-neutral-700 text-center font-bold mt-3">{title}</p>
    </div>
  );
};
