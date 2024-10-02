import { getCourses, getUserProgress } from "@/db/queries"; // Importing functions to fetch courses and user progress from the database
import { Metadata } from "next"; // Type for metadata in Next.js
import { CoursesList } from "./components/CoursesList"; // Importing the CoursesList component to display the list of courses

// Metadata for the page, which will be used by Next.js for SEO and browser display
export const metadata: Metadata = {
  title: "abLanguages | Courses page", // The title of the page
  description: "Select the language You want to Learn!", // A description of the page
};

// Async function to render the CoursesPage
const CoursesPage = async () => {
  // Fetching the courses and user progress using promises for better performance
  const coursesPromise = getCourses(); // Fetching the list of courses
  const userProgressPromise = getUserProgress(); // Fetching the user's progress

  // Using Promise.all to resolve both promises concurrently for efficiency
  const [courses, userProgress] = await Promise.all([
    coursesPromise,
    userProgressPromise,
  ]);

  return (
    // Main layout container for the courses page
    <main className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1> {/* Page heading */}

      {/* Conditional rendering to display a message if no courses are found, otherwise display the list */}
      {courses.length === 0 ? (
        <h1 className="mt-10 text-center text-3xl underline">
          No language found !
        </h1>
      ) : (
        <CoursesList
          courses={courses} // Passing the fetched courses data to the CoursesList component
          activeCourseId={userProgress?.activeCourseId} // Passing the active course ID from user progress
        />
      )}
    </main>
  );
};

export default CoursesPage; // Exporting the page as the default export
