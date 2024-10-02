import { FC } from "react"; // Importing FC (Functional Component) type from React

import { lessons, units } from "@/db/schema"; // Importing lessons and units schema from the database
import { LessonButton } from "./LessonButton"; // Import LessonButton component
import { UnitBanner } from "./UnitBanner"; // Import UnitBanner component

// Props definition for Unit component
interface UnitsProps {
  id: number;
  title: string;
  description: string;
  order: number; // Determines the position in a sequence of units
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean; // Indicates whether the lesson is completed
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined; // Currently active lesson, or undefined if none are active
  activeLessonPercentage: number; // Percentage completion for the active lesson
}

// Unit component definition
export const Unit: FC<UnitsProps> = ({
  activeLesson,
  activeLessonPercentage,
  description,
  lessons,
  id,
  order,
  title,
}) => {
  // Background and border colors for the unit, determined by the order in a cycle
  const cycleLength = 6;
  const cycleIndex = order % cycleLength; // Determine current index in the cycle

  let background; // Background color based on the cycleIndex
  let border; // Border color based on the cycleIndex

  // Determine background and border styles based on cycleIndex
  if (cycleIndex <= 1) {
    background = "#fb923c";
    border = "border-orange-600";
  } else if (cycleIndex <= 2) {
    background = "#c084fc";
    border = "border-purple-500";
  } else if (cycleIndex <= 3) {
    background = "#FF4433";
    border = "border-red-500";
  } else if (cycleIndex <= 4) {
    background = "#38bdf8";
    border = "border-sky-500";
  } else if (cycleIndex <= 5) {
    background = "##fab2f3";
    border = "border-pink-500";
  } else {
    background = "#22c55e";
    border = "border-green-600";
  }

  return (
    <div className={`mb-10 unit-section__${cycleIndex}`}>
      {/* Unit banner displaying the title and description */}
      <UnitBanner
        title={title}
        description={description}
        isActiveUnit={activeLesson?.unitId === id} // Check if the unit is active
        background={background} // Pass calculated background color to the UnitBanner
      />

      {/* Container for lesson buttons */}
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, i) => {
          // Determine whether the lesson is the current lesson
          const isCurrent = lesson.id === activeLesson?.id;
          // Determine if the lesson is locked based on completion status
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id} // Unique key for each lesson in the list
              id={lesson.id} // Lesson ID
              index={i} // Index of the lesson in the list
              totalCount={lessons.length - 1} // Total number of lessons minus one (for zero-based index)
              current={isCurrent} // Boolean indicating if this is the current lesson
              locked={isLocked} // Boolean indicating if the lesson is locked
              percentage={activeLessonPercentage} // Current completion percentage
              background={background} // Background color for the button
              border={border} // Border color for the button
            />
          );
        })}
      </div>
    </div>
  );
};
