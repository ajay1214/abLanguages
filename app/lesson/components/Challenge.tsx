import { challengeOptions, challenges } from "@/db/schema"; 
// Importing the challenge options and challenges schema
import { cn } from "@/lib/utils"; 
// Utility function for conditionally applying class names
import { FC } from "react"; 
// Importing FC (Functional Component) from React
import Card from "./Card"; 
// Importing the Card component

interface ChallengeProps {
  options: (typeof challengeOptions.$inferSelect)[]; 
  // Array of challenge options
  onSelect: (id: number) => void; 
  // Function to handle the selection of an option
  status: "correct" | "wrong" | "none"; 
  // The status of the challenge (correct, wrong, or none)
  selectedOption?: number; 
  // The currently selected option ID (if any)
  disabled?: boolean; 
  // Whether the challenge is disabled or not
  type: (typeof challenges.$inferSelect)["type"]; 
  // Type of challenge (ASSIST, SELECT, etc.)
}

export const Challenge: FC<ChallengeProps> = ({
  onSelect,
  options,
  status,
  type,
  disabled,
  selectedOption,
}) => {
  return (
    <div
      className={cn(
        "grid gap-2",
        // Conditional class names for different challenge types
        type === "ASSIST" && "grid-cols-1", 
        // ASSIST type displays a single column
        type === "SELECT" &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
        // SELECT type displays a grid with two columns or more based on screen size
      )}
    >
      {options.map((option, i) => (
        <Card
          key={option.id} 
          // Unique key for each card
          id={option.id} 
          // Pass the option ID to the card
          text={option.text} 
          // Text of the option
          imgSrc={option.imgSrc} 
          // Optional image for the option
          shortcut={`${i + 1}`} 
          // Shortcut key (1, 2, 3, etc.)
          selected={selectedOption === option.id} 
          // If the option is currently selected
          onClick={() => onSelect(option.id)} 
          // Call onSelect when the card is clicked
          status={status} 
          // The status of the challenge
          audioSrc={option.audioSrc} 
          // Optional audio source for the option
          disabled={disabled} 
          // Whether the card is disabled
          type={type} 
          // Type of challenge
        />
      ))}
    </div>
  );
};
