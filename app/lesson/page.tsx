import { redirect } from "next/navigation"; // Importing the redirect function from Next.js for navigation
import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries"; // Importing required database queries
import { Quiz } from "./components/Quiz"; // Importing the Quiz component

// Defining the async LessonPage component
const LessonPage = async () => {
  // Fetching the lesson, user progress, and user subscription data concurrently
  const lessonPromise = getLesson(); // Fetching the current lesson
  const userProgressPromise = getUserProgress(); // Fetching the user's progress
  const userSubscriptionPromise = getUserSubscription(); // Fetching the user's subscription status

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonPromise,
    userProgressPromise,
    userSubscriptionPromise,
  ]); // Waiting for all promises to resolve

  // If the lesson or user progress doesn't exist, redirect to the "/learn" page
  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  // Calculating the initial percentage of completed challenges
  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  // Rendering the Quiz component with the necessary initial data
  return (
    <Quiz
      initialLessonId={lesson.id} // Passing lesson ID as a prop
      initialLessonChallenges={lesson.challenges} // Passing lesson challenges as a prop
      initialHearts={userProgress.hearts} // Passing user's remaining hearts as a prop
      initialPercentage={initialPercentage} // Passing the calculated completion percentage as a prop
      userSubscription={userSubscription} // Passing user's subscription status as a prop
    />
  );
};

export default LessonPage; // Exporting the LessonPage component as the default export
