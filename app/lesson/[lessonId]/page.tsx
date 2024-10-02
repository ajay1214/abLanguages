import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
// Importing necessary queries to fetch lesson, user progress, and subscription

import { notFound, redirect } from "next/navigation";
// Importing navigation helpers for handling 404 and redirects

import { Quiz } from "../components/Quiz";
// Importing the Quiz component for rendering

const PracticePage = async ({
  params: { lessonId },
}: {
  params: { lessonId: string };
}) => {
  // Fetch lesson, user progress, and user subscription data concurrently
  const lessonPromise = getLesson(+lessonId);
  const userProgressPromise = getUserProgress();
  const userSubscriptionPromise = getUserSubscription();

  // Awaiting all promises together using Promise.all for better performance
  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonPromise,
    userProgressPromise,
    userSubscriptionPromise,
  ]);

  // If the lesson doesn't exist, return a 404 error
  if (!lesson) notFound();

  // If user progress is missing, redirect to the learning page
  if (!userProgress) redirect("/learn");

  // Calculate the initial percentage of completed challenges in the lesson
  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  // Render the Quiz component with initial data
  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
};

export default PracticePage;
