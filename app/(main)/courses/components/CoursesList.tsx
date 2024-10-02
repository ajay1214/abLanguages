"use client"; // Indicates that this file is for client-side rendering

import { upsertUserProgress } from "@/actions/userProgress"; // Action to update or insert user progress
import { courses, userProgress } from "@/db/schema"; // Types for courses and user progress from the database schema
import { useRouter } from "next/navigation"; // Hook to navigate programmatically within the Next.js app
import { useTransition } from "react"; // React hook for handling transitions for updates
import { toast } from "sonner"; // Library for displaying notifications
import { CourseCard } from "./CourseCard"; // Importing the CourseCard component

type Props = {
  courses: (typeof courses.$inferSelect)[]; // Type for the list of courses
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId; // Optional type for the active course ID from user progress
};

// Functional component definition for CoursesList
export const CoursesList = ({ activeCourseId, courses }: Props) => {
  const router = useRouter(); // Next.js router hook for navigation
  const [pending, startTransition] = useTransition(); // Hook to handle UI transitions (pending state)

  // Function to handle when a course card is clicked
  const onClick = (id: number) => {
    if (pending) return; // Prevents action if a transition is already in progress

    if (id === activeCourseId) {
      // If the clicked course is the active one, navigate directly to the learning page
      return router.push("learn");
    }

    // Start a UI transition to update the active course
    startTransition(() => {
      upsertUserProgress(id).catch(() =>
        toast.error("Could not choose the language. Something went wrong.") // Displays an error notification if the operation fails
      );
    });
  };

  return (
    // Section to display the list of courses in a responsive grid layout
    <section className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id} // Unique key for each course (required by React when rendering lists)
          {...course} // Spreading the course properties to pass them as props to CourseCard
          handleClick={onClick} // Passing the click handler function to CourseCard
          disabled={pending} // Disabling the CourseCard while a transition is pending
          active={course.id === activeCourseId} // Marking the CourseCard as active if the course ID matches the active course
        />
      ))}
    </section>
  );
};
