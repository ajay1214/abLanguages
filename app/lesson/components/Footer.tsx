import { Button } from "@/components/ui/button"; 
// Importing the Button component
import { cn } from "@/lib/utils"; 
// Utility function for conditionally applying class names
import { CheckCircle, XCircle } from "lucide-react"; 
// Importing icons from Lucide
import { useRouter } from "next/navigation"; 
// Importing the router hook for navigation
import { FC } from "react"; 
// Importing FC (Functional Component) from React
import { useKey, useMedia } from "react-use"; 
// Hooks from react-use for keyboard shortcuts and media queries

interface FooterProps { 
  // Defining the interface for component props
  onCheck: () => void; 
  // Function to handle the "Check" action
  status: "none" | "wrong" | "correct" | "completed"; 
  // Status of the lesson or quiz (none, wrong, correct, or completed)
  disabled?: boolean; 
  // Whether the button should be disabled
  lessonId?: number; 
  // Optional lesson ID for navigation purposes
}

export const Footer: FC<FooterProps> = ({
  onCheck,
  status,
  disabled,
  lessonId,
}) => {
  useKey("Enter", onCheck, {}, [onCheck]); 
  // Adding keyboard shortcut for "Enter" to trigger onCheck
  const isMobile = useMedia("(max-width: 1024px)"); 
  // Checking if the screen size is mobile using media queries

  const router = useRouter(); 
  // Using the Next.js router to navigate between pages

  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2 mt-2 py-8", 
        // Footer styles with height, border, margin, and padding
        status === "correct" && "bg-transparent bg-orange-100", 
        // Add background color if the status is correct
        status === "wrong" && "bg-transparent bg-red-100" 
        // Add background color if the status is wrong
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-4 lg:px-10">
        {/* Container for footer content, centered horizontally with padding */}
        
        {status === "correct" && (
          <div className="text-orange-500 font-bold text-base lg:text-2xl flex items-center">
            {/* If the status is correct, show this message */}
            <CheckCircle className="size-6 lg:size-10 mr-4" />
            {/* Icon indicating correctness */}
            Nicely done !
          </div>
        )}

        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            {/* If the status is wrong, show this message */}
            <XCircle className="size-6 lg:size-10 mr-4" />
            {/* Icon indicating wrong answer */}
            Try again.
          </div>
        )}

        {status === "completed" && (
          <Button
            variant="default"
            size={isMobile ? "sm" : "lg"}
            // Button size changes based on screen size (small for mobile, large for desktop)
            onClick={() => router.push(`/lesson/${lessonId}`)}
            // Redirect to the lesson page when clicked
          >
            Practice again.
          </Button>
        )}

        <Button
          disabled={disabled} 
          // Disable the button if the disabled prop is true
          className="ml-auto"
          onClick={onCheck} 
          // Trigger the onCheck function when clicked
          size={isMobile ? "sm" : "lg"} 
          // Button size changes based on screen size
          variant={status === "wrong" ? "danger" : "secondary"} 
          // Change button variant based on the status
        >
          {status === "none" && "Check"} 
          {/* Show "Check" when no status is set */}
          {status === "correct" && "Next"} 
          {/* Show "Next" if the status is correct */}
          {status === "wrong" && "Retry"} 
          {/* Show "Retry" if the status is wrong */}
          {status === "completed" && "Continue"} 
          {/* Show "Continue" if the status is completed */}
        </Button>
      </div>
    </footer>
  );
};
