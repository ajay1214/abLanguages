import { redirect } from "next/navigation"; // Importing redirect function for conditional client-side redirection

// Importing components used in the Learning Page
import { FeedWrapper } from "@/components/FeedWrapper"; // Wrapper for main feed content
import { Promo } from "@/components/Promo"; // Promotional section encouraging subscriptions
import { Quests } from "@/components/Quests"; // Component that shows available quests for the user
import { StickyWrapper } from "@/components/StickyWrapper"; // Wrapper for sticky elements like the sidebar
import { UserProgress } from "@/components/UserProgress"; // Component to display user progress summary
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries"; // Importing data fetching functions for different user progress-related information
import { Navbar } from "./components/Navbar"; // Navigation bar component for course navigation
import { Unit } from "./components/Unit"; // Unit component that contains lessons for each unit

// Metadata for SEO and page details
export const metadata = {
  title: "abLanguages | Learning page",
  description: "Achieve fluency in new languages with the help of abLanguages.",
};

// Main component for the Learn page
const LearnPage = async () => {
  // Fetching all required data concurrently to speed up data retrieval
  const userProgressPromise = getUserProgress(); // Fetch user progress data, including active course and points
  const courseProgressPromise = getCourseProgress(); // Fetch current course progress, including active lessons
  const lessonPercentagePromise = getLessonPercentage(); // Fetch percentage of completion for the current lesson
  const unitsDataPromise = getUnits(); // Fetch all units data including titles and descriptions
  const userSubscriptionPromise = getUserSubscription(); // Fetch user's subscription status to determine premium features

  // Using Promise.all to resolve all fetched data simultaneously
  const [
    userProgress,
    courseProgress,
    lessonPercentage,
    units,
    userSubscription,
  ] = await Promise.all([
    userProgressPromise,
    courseProgressPromise,
    lessonPercentagePromise,
    unitsDataPromise,
    userSubscriptionPromise,
  ]);

  // Check if user has active course or lesson progress. If not, redirect them to the courses page.
  if (
    !userProgress || // If user progress data does not exist
    !userProgress.activeCourse || // If no active course is found for the user
    !courseProgress?.activeLesson // If no active lesson is associated with the current course
  )
    redirect("/courses"); // Redirect to the courses page if conditions aren't met

  return (
    <div className="flex gap-12 px-6">
      {/* Main feed section wrapped inside FeedWrapper */}
      <FeedWrapper>
        {/* Navbar component to show the title of the active course */}
        <Navbar title={userProgress.activeCourse.title} />

        {/* Iterating over each unit fetched from the database and displaying them */}
        {units.map((unit) => (
          <Unit
            {...unit} // Spreading each unit's properties as props into the Unit component
            activeLesson={courseProgress.activeLesson} // Pass the active lesson for the course
            activeLessonPercentage={lessonPercentage} // Pass percentage of progress for the active lesson
            key={unit.id} // Unique key required for efficient rendering in React
          />
        ))}
      </FeedWrapper>

      {/* Sidebar section for additional user information and actions */}
      <StickyWrapper>
        {/* Displaying user's current progress, such as points, hearts, and active subscription status */}
        <UserProgress
          activeCourse={userProgress.activeCourse} // Current active course data
          hearts={userProgress.hearts} // Number of "hearts" the user has (likely a type of currency or reward)
          points={userProgress.points} // Points accumulated by the user through learning
          hasActiveSubscription={!!userSubscription?.isActive} // Boolean flag to determine if user has an active subscription
        />

        {/* Display promo section if user doesn't have an active subscription */}
        {!userSubscription?.isActive && <Promo />}

        {/* Quests section to display challenges or tasks available to the user */}
        <Quests points={userProgress.points} />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
