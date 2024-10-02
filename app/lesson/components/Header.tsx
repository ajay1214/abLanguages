import { FC } from "react"; 
// Importing FC (Functional Component) from React
import Image from "next/image"; 
// Importing Next.js Image component for optimized image rendering
import { InfinityIcon, X } from "lucide-react"; 
// Importing icons from Lucide
import { Progress } from "@/components/ui/progress"; 
// Importing the Progress component for displaying the progress bar
import { useExitModal } from "@/store/useExitModal"; 
// Importing a custom hook to handle the exit modal state

interface HeaderProps { 
  // Defining the interface for component props
  hearts: number; 
  // Number of hearts (lives) the user has
  percentage: number; 
  // Current progress percentage for the progress bar
  hasActiveSubscription: boolean; 
  // Boolean indicating if the user has an active subscription
}

export const Header: FC<HeaderProps> = ({
  hasActiveSubscription,
  hearts,
  percentage,
}) => {
  const { open } = useExitModal(); 
  // Destructuring the open method from useExitModal hook

  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      {/* Header styling: padding, gap, and alignment of items */}

      <X
        onClick={open} 
        // Clicking the X icon opens the exit modal
        className="text-black-500 hover:opacity-75 transition cursor-pointer"
        // Icon styling: color, hover effect, and cursor pointer
      />

      <Progress value={percentage} /> 
      {/* Progress bar displaying the current percentage of progress */}

      <div className="text-rose-500 flex items-center font-bold">
        {/* Container for hearts and subscription status */}

        <Image
          src="/heart.svg" 
          // Path to the heart image
          height={28} 
          // Height of the image
          width={28} 
          // Width of the image
          alt="Heart" 
          // Alt text for accessibility
          className="mr-2" 
          // Adding margin-right for spacing between heart and text/icon
        />

        {hasActiveSubscription ? (
          <InfinityIcon className="h-6 w-6 stroke-[3] shrink-0" /> 
          // If the user has an active subscription, show an infinity icon
        ) : (
          hearts 
          // Otherwise, show the number of hearts (lives) remaining
        )}
      </div>
    </header>
  );
};
