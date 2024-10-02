import Link from "next/link"; // Importing Link component for client-side navigation
import { FC } from "react"; // Importing FC (Functional Component) type from React

import { Button } from "@/components/ui/button"; // Importing a custom Button component
import { NotebookText } from "lucide-react"; // Importing an icon for the button

// Props definition for UnitBanner component
interface UnitBannerProps {
  title: string; // Title of the unit
  description: string; // Description of the unit
  isActiveUnit: boolean; // Indicates if this is the active unit
  background: string; // Background color of the banner
}

// UnitBanner component definition
export const UnitBanner: FC<UnitBannerProps> = ({
  title,
  description,
  isActiveUnit,
  background,
}) => {
  return (
    <div
      className="w-full rounded-xl p-5 text-white flex justify-between items-center flex-wrap gap-4"
      style={{
        background, // Set background color dynamically based on prop
      }}
    >
      {/* Title and description section */}
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3> {/* Display unit title */}
        <p className="text-lg">{description}</p> {/* Display unit description */}
      </div>

      {/* Button to continue the lesson, shown only if this is the active unit */}
      {isActiveUnit && (
        <Link href="/lesson">
          <Button
            size="lg"
            className="hidden lg:flex text-white" // Button only visible on large screens and above
            style={{
              background, // Set background color dynamically based on prop
            }}
          >
            {/* Icon inside the button followed by text */}
            <NotebookText className="mr-2" /> Continue
          </Button>
        </Link>
      )}
    </div>
  );
};
