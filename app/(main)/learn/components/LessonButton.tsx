"use client"; // Indicates this is a client-side component in Next.js

import Link from "next/link";
import { FC } from "react"; // FC (Functional Component) type from React

import { Check, Crown, Star } from "lucide-react"; // Import icons
import { CircularProgressbarWithChildren } from "react-circular-progressbar"; // Progress bar component

import { Button } from "@/components/ui/button"; // Custom button component
import { cn } from "@/lib/utils"; // Utility for conditional class names
import "react-circular-progressbar/dist/styles.css"; // Styles for the progress bar

// Props definition for LessonButton component
interface LessonButtonProps {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
  background: string;
  border: string;
}

// Main LessonButton component
export const LessonButton: FC<LessonButtonProps> = ({
  id,
  index,
  percentage,
  totalCount,
  current,
  locked,
  background,
  border,
}) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength; // Determine the index position within a repeating cycle

  let indentationLevel;

  // Determine indentation level based on cycleIndex value
  if (cycleIndex <= 0) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 1) {
    indentationLevel = 1.8 - cycleIndex;
  } else if (cycleIndex <= 2) {
    indentationLevel = 3.2 - cycleIndex;
  } else if (cycleIndex <= 3) {
    indentationLevel = 3.8 - cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 5) {
    indentationLevel = 4.2 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4.8 - cycleIndex;
  } else if (cycleIndex <= 7) {
    indentationLevel = 6.2 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 50; // Calculate horizontal position offset

  // Determine button states
  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  // Determine which icon to display
  const Icon = isCompleted ? Check : isLast ? Crown : Star;

  // Set the link to either the lesson or a placeholder if locked
  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <Link
      href={href}
      aria-disabled={locked} // Sets ARIA attribute for accessibility
      className={locked ? "pointer-events-none" : "pointer-events-auto"} // Disable pointer events if locked
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`, // Apply calculated horizontal offset
          marginTop: isFirst && !isCompleted ? 60 : 20, // Add extra top margin for the first item
        }}
      >
        {current ? (
          // Render progress bar if current lesson is active
          <div className="size-[102px] relative">
            <div
              className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase bg-white rounded-xl animate-bounce tracking-wide z-10 after:absolute after:left-1/2 after:-bottom-2 after:size-0 after:border-x-8 after:border-x-transparent after:border-t-8 after:-translate-x-1/2"
              style={{
                color: background, // Set text color based on background prop
              }}
            >
              Start
            </div>

            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage} // Display progress percentage
              styles={{
                path: {
                  stroke: background, // Set color of the progress bar path
                },
                trail: {
                  stroke: "#e5e7eb", // Set color of the progress bar trail
                },
              }}
            >
              <Button
                size="rounded"
                variant={locked ? "locked" : "default"}
                className={`size-[70px] border-0 border-b-8 active:border-b-0 ${
                  !locked && border // Conditional border color
                }`}
                style={{
                  background, // Set button background color
                }}
              >
                <Icon
                  className={cn(
                    "size-10",
                    locked
                      ? "fill-neutral-400 text-neutral-400 stroke-neutral-400" // Gray color if locked
                      : "fill-primary-foreground text-primary-foreground", // Default color if unlocked
                    isCompleted && "fill-none stroke-[4]" // Specific styling for completed items
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          // Render a simple button if the lesson is not the current one
          <Button
            size="rounded"
            variant={locked ? "locked" : "default"}
            className={`size-[70px] border-0 border-b-8 active:border-b-0 ${
              !locked && border // Conditional border color
            }`}
            style={{
              background: !locked ? background : "", // Set background color only if not locked
            }}
          >
            <Icon
              className={cn(
                "size-10",
                locked
                  ? "fill-neutral-400 text-neutral-400 stroke-neutral-400" // Gray color if locked
                  : "fill-primary-foreground text-primary-foreground", // Default color if unlocked
                isCompleted && "fill-none stroke-[4]" // Specific styling for completed items
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};
