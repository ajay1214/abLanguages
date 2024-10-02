import { FC, useCallback } from "react";
import Image from "next/image";

import { useAudio, useKey } from "react-use";
// Importing hooks for audio handling and keyboard shortcuts

import { challenges } from "@/db/schema";
// Importing the challenges schema

import { cn } from "@/lib/utils";
// Importing the utility for conditionally applying class names

interface CardProps {
  id: number;
  text: string;
  imgSrc: string | null;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  status: "none" | "wrong" | "correct";
  audioSrc: string | null;
  disabled: boolean | undefined;
  type: (typeof challenges.$inferSelect)["type"];
}

const Card: FC<CardProps> = ({
  audioSrc,
  disabled,
  id,
  imgSrc,
  onClick,
  shortcut,
  status,
  text,
  type,
  selected,
}) => {
  // useAudio hook for handling audio playback
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });

  // Callback for handling click events
  const handleClick = useCallback(() => {
    if (disabled) return; // If card is disabled, do nothing

    controls.play(); // Play the audio when card is clicked

    onClick(); // Call the onClick prop function
  }, [disabled, onClick, controls]);

  // Hook to bind the keyboard shortcut to handleClick
  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick} // Attach the click handler to the card
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        // Apply styles based on the selected and status props
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        selected &&
          status === "correct" &&
          "border-orange-300 bg-orange-100 hover:bg-orange-100",
        selected &&
          status === "wrong" &&
          "border-rose-300 bg-rose-100 hover:bg-rose-100",
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {audio} {/* Render the audio component */}

      {/* Conditionally render the image if imgSrc is available */}
      {imgSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image src={imgSrc} alt={text} fill /> {/* Display the image */}
        </div>
      )}

      <div
        className={cn(
          "flex justify-between items-center",
          // Reverse the layout for ASSIST type
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div />} {/* Placeholder for layout adjustment */}

        <p
          className={cn(
            "text-neutral-600 text-sm lg:text-base",
            // Apply different text colors based on selection and status
            selected && "border-sky-300 text-sky-500",
            selected &&
              status === "correct" &&
              "text-orange-500 border-orange-500",
            selected && status === "wrong" && "text-rose-500 border-rose-500"
          )}
        >
          {text} {/* Display the card text */}
        </p>

        <div
          className={cn(
            "lg:size-8 size-5 border-2 flex items-center justify-center rounded-lg to-neutral-400 lg:text-[15px] text-xs font-semibold",
            // Apply different styles for shortcut text based on status and selection
            selected && "border-sky-300 text-sky-500",
            selected &&
              status === "correct" &&
              "border-orange-300 text-orange-500",
            selected && status === "wrong" && "border-rose-300 text-rose-500"
          )}
        >
          {shortcut} {/* Display the shortcut key */}
        </div>
      </div>
    </div>
  );
};

export default Card;
