"use server"; 
// This enables server-side features in Next.js, such as database interactions and revalidation.

import { revalidatePath } from "next/cache";
// Used to trigger cache invalidation on certain paths to update client-side content after changes.

import { redirect } from "next/navigation";
// Redirects the user to a different page after certain operations (e.g., after updating user progress).

import db from "@/db/drizzle";
// Importing the database instance configured with Drizzle ORM to interact with database tables.

import {
  getCourseById,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
// Importing helper functions to fetch the course, user progress, and user subscription details from the database.

import { challengeProgress, challenges, userProgress } from "@/db/schema";
// Importing database schemas for `challengeProgress`, `challenges`, and `userProgress` tables to execute queries.

import { auth, currentUser } from "@clerk/nextjs/server";
// Clerk authentication services to fetch the current user and manage authentication.

import { and, eq } from "drizzle-orm";
// Importing ORM utilities to help with query conditions (e.g., `and`, `eq`).

// This function is responsible for updating or inserting user progress related to a course.
export const upsertUserProgress = async (courseId: number) => {
  const { userId } = auth();
  // Retrieves the authenticated user's ID.

  const user = await currentUser();
  // Fetches current user information like username and profile picture.

  if (!userId || !user) {
    throw new Error("Unauthorized");
    // Throws an error if the user is not authenticated.
  }

  const course = await getCourseById(courseId);
  // Fetches the course data by its `courseId`.

  if (!course) {
    throw new Error("Course not found");
    // Throws an error if the course does not exist in the database.
  }

  if (!course.units.length || course.units[0].lessons.length === 0) {
    throw new Error("Course is empty");
    // Throws an error if the course has no units or lessons.
  }

  const existingUserProgress = await getUserProgress();
  // Checks if the user already has progress in any course.

  if (existingUserProgress) {
    // If user progress exists, update the user’s current course and profile data in `userProgress` table.
    await db
      .update(userProgress)
      .set({
        activeCourseId: courseId,
        userName: user.username || "ajaykUser",
        // Use the username from the `user` object or set a default.
        userImgSrc: user.imageUrl || "/abLanguagesLogo.svg",
        // Use the user's image or a default one if not available.
      })
      .where(eq(userProgress.userId, userId));
    // Updates only the specific user's progress based on the `userId`.

    revalidatePath("/courses");
    revalidatePath("/learn");
    // Invalidate these paths to ensure the updated progress is shown on the frontend.

    redirect("/learn");
    // Redirect the user to the "/learn" page after the update.
  }

  // If no existing progress, insert new progress for the course:
  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.username || "ajaykUser",
    userImgSrc: user.imageUrl || "/abLanguagesLogo.svg",
    // Insert user information and the active course into `userProgress`.
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  // Revalidate paths to reflect the new progress.

  redirect("/learn");
  // Redirect the user to the "/learn" page.
};

// This function reduces the user's hearts when attempting a challenge.
export const reduceHearts = async (challengeId: number) => {
  const { userId } = auth();
  // Fetches the authenticated user’s ID.

  if (!userId) {
    throw new Error("Unauthorized");
    // If the user is not authenticated, throw an error.
  }

  const currentUserProgress = await getUserProgress();
  // Fetch the current user's progress (hearts, points, etc.).

  const userSubscription = await getUserSubscription();
  // Fetches the user's subscription status.

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
    // Find the specific challenge based on `challengeId`.
  });

  if (!challenge) {
    throw new Error("Challenge not found !");
    // If the challenge doesn't exist, throw an error.
  }

  const lessonId = challenge.lessonId;
  // Extract the `lessonId` from the challenge for later use.

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
    // Check if the user has already attempted this challenge (practice mode).
  });

  const isPractice = !!existingChallengeProgress;
  // If `existingChallengeProgress` exists, set `isPractice` to true.

  if (isPractice) {
    return { error: "practice" };
    // Return an error if the user is attempting a practice session.
  }

  if (!currentUserProgress) {
    throw new Error("User progress not found");
    // If the user’s progress doesn’t exist, throw an error.
  }

  if (userSubscription?.isActive) {
    return { error: "subscription" };
    // If the user has an active subscription, return a specific error.
  }

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
    // Return an error if the user has no hearts left to attempt the challenge.
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
      // Decrease the user's hearts by 1, but ensure it doesn’t go below 0.
    })
    .where(eq(userProgress.userId, userId));
    // Update the `userProgress` for the current user in the database.

  // Revalidate paths to update the user's hearts status and other related pages:
  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

// This function refills the user's hearts by deducting points.
export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();
  // Fetch the current user’s progress.

  if (!currentUserProgress) {
    throw new Error("User progress not found !");
    // Throw an error if the progress record is not found.
  }

  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts are already full !");
    // Throw an error if the user's hearts are already at the maximum (5).
  }

  if (currentUserProgress.points < 50) {
    throw new Error("Not enough points !");
    // If the user has fewer than 50 points, they cannot refill hearts. Throw an error.
  }

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      // Refill hearts to 5.
      points: currentUserProgress.points - 50,
      // Deduct 50 points from the user's total.
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));
    // Update the user's `userProgress` in the database.

  // Revalidate the relevant pages to reflect the heart refill:
  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
