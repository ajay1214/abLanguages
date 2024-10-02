// Importing necessary modules and functions for database operations and authentication
import { auth } from "@clerk/nextjs/server"; // Clerk authentication
import { eq } from "drizzle-orm"; // Equality check for queries
import { cache } from "react"; // Cache for optimizing function results
import db from "./drizzle"; // Database connection instance
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress,
  userSubscription,
} from "./schema"; // Database schema definitions

// Fetches all available courses from the database
export const getCourses = cache(async () => {
  const courses = await db.query.courses.findMany(); // Querying all courses

  if (!courses) return []; // Return an empty array if no courses found

  return courses; // Return the list of courses
});

// Fetches user progress based on the authenticated user
export const getUserProgress = cache(async () => {
  const { userId } = auth(); // Get the user ID from authentication context

  if (!userId) {
    return null; // Return null if no user ID is found
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId), // Query user progress by user ID
    with: {
      activeCourse: true, // Include active course details
    },
  });

  return data; // Return user progress data
});

// Fetches a specific course by its ID, including its units and lessons
export const getCourseById = cache(async (courseId: number) => {
  return await db.query.courses.findFirst({
    where: eq(courses.id, courseId), // Find course by ID
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)], // Order units by their order
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)], // Order lessons within each unit
          },
        },
      },
    },
  });
});

// Fetches all units related to the user's active course
export const getUnits = cache(async () => {
  const { userId } = auth(); // Get the user ID from authentication context
  const userProgress = await getUserProgress(); // Get user progress

  if (!userId || !userProgress?.activeCourseId) {
    return []; // Return empty array if user ID or active course ID is not found
  }

  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)], // Order units by their order
    where: eq(units.courseId, userProgress.activeCourseId), // Find units by active course ID
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)], // Order lessons within each unit
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)], // Order challenges within each lesson
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId), // Find challenge progress by user ID
              },
            },
          },
        },
      },
    },
  });

  // Normalize data to include lesson completion status
  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false }; // Mark lesson as incomplete if it has no challenges
      }
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed) // Check if all challenges are completed
        );
      });

      return { ...lesson, completed: allCompletedChallenges }; // Return lesson with completion status
    });

    return { ...unit, lessons: lessonsWithCompletedStatus }; // Return unit with updated lessons
  });

  return normalizedData; // Return the normalized data
});

// Fetches the progress of the user's active course
export const getCourseProgress = cache(async () => {
  const { userId } = auth(); // Get the user ID from authentication context
  const userProgress = await getUserProgress(); // Get user progress

  if (!userId || !userProgress?.activeCourseId) {
    return null; // Return null if user ID or active course ID is not found
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)], // Order units by their order
    where: eq(units.courseId, userProgress.activeCourseId), // Find units by active course ID
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)], // Order lessons within each unit
        with: {
          unit: true, // Include unit details
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId), // Find challenge progress by user ID
              },
            },
          },
        },
      },
    },
  });

  // Find the first uncompleted lesson in the active course
  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons) // Flatten all lessons from all units
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress) => progress.completed === false // Check if any challenge is incomplete
          )
        );
      });
    });

  return {
    activeLesson: firstUncompletedLesson, // Return the first uncompleted lesson
    activeLessonId: firstUncompletedLesson?.id, // Return its ID
  };
});

// Fetches a lesson by its ID or the active lesson ID from course progress
export const getLesson = cache(async (id?: number) => {
  const { userId } = auth(); // Get the user ID from authentication context

  if (!userId) {
    return null; // Return null if no user ID is found
  }

  const courseProgress = await getCourseProgress(); // Get course progress

  const lessonId = id || courseProgress?.activeLessonId; // Use provided ID or active lesson ID

  if (!lessonId) {
    return null; // Return null if no lesson ID is found
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId), // Find lesson by ID
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)], // Order challenges by their order
        with: {
          challengeOptions: true, // Include challenge options
          challengeProgress: {
            where: eq(challengeProgress.userId, userId), // Find challenge progress by user ID
          },
        },
      },
    },
  });

  if (!data || !data.challenges) {
    return null; // Return null if no lesson data or challenges are found
  }

  // Normalize challenge data to include completion status
  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed); // Check if all challenge progress is completed

    return { ...challenge, completed }; // Return challenge with completion status
  });

  return { ...data, challenges: normalizedChallenges }; // Return lesson data with updated challenges
});

// Calculates the completion percentage of the user's active lesson
export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress(); // Get course progress

  if (!courseProgress?.activeLessonId) {
    return 0; // Return 0% if no active lesson ID is found
  }

  const lesson = await getLesson(courseProgress.activeLessonId); // Get the lesson by active lesson ID

  if (!lesson) {
    return 0; // Return 0% if no lesson data is found
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed // Filter for completed challenges
  );

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100 // Calculate completion percentage
  );

  return percentage; // Return the completion percentage
});

// Constant representing one day in milliseconds
const DAY_IN_MS = 86_400_000;

// Fetches user subscription details based on the authenticated user
export const getUserSubscription = cache(async () => {
  const { userId } = auth(); // Get the user ID from authentication context

  if (!userId) return null; // Return null if no user ID is found

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId), // Find subscription by user ID
  });

  if (!data) return null; // Return null if no subscription data is found

  // Determine if the subscription is active based on the current period end date
  const isActive =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive, // Include active status in the returned data
  };
});

// Fetches a list of user IDs for all subscribed users, limited to 18
export const getAllSubscribedUser = cache(async () => {
  const data = await db.query.userSubscription.findMany({
    limit: 18, // Limit results to 18
    columns: {
      userId: true, // Select only userId
    },
  });

  if (!data) return null; // Return null if no data is found

  const subscribedUser = data.map((user) => user.userId); // Extract user IDs

  return subscribedUser; // Return the list of subscribed user IDs
});

// Fetches the top ten users based on their points, limited to 18 for the query
export const getTopTenUsers = cache(async () => {
  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)], // Order by points in descending order
    limit: 18, // Limit results to 18
    columns: {
      userId: true, // Select only userId
      userName: true, // Select userName
      userImgSrc: true, // Select user image source
      points: true, // Select points
    },
  });

  return data; // Return the list of top users
});
