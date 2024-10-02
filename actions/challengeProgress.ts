"use server"; 
// This enables the file to use Next.js server-side capabilities, such as database queries and revalidation.

import db from "@/db/drizzle";
// Importing the database instance (configured using Drizzle ORM) to interact with the database.

import { getUserProgress, getUserSubscription } from "@/db/queries";
// Importing helper functions to get user progress and subscription details from the database.

import { challengeProgress, challenges, userProgress } from "@/db/schema";
// Importing database schemas for `challengeProgress`, `challenges`, and `userProgress` tables to run queries.

import { auth } from "@clerk/nextjs/server";
// Importing `auth` from Clerk to handle user authentication and fetch current user data.

import { and, eq } from "drizzle-orm";
// Drizzle ORM utilities for writing database query conditions (e.g., `and`, `eq`).

import { revalidatePath } from "next/cache";
// Importing function to revalidate the server cache and update pages on specific routes.

export const upsertChallengeProgress = async (challengeId: number) => {
  // This function updates or inserts challenge progress for a user.
  // It takes a `challengeId` as an argument.

  const { userId } = auth();
  // Fetching the current user's ID using Clerk's authentication service.

  if (!userId) {
    // If the user is not authenticated (no userId), throw an error.
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress();
  // Get the current user's progress (like points, hearts) from the database.

  const userSubscription = await getUserSubscription();
  // Fetch the user's subscription status (active or inactive).

  if (!currentUserProgress) {
    // If the user progress record is not found, throw an error.
    throw new Error("User not found");
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
    // Fetch the specific challenge data using `challengeId` from the `challenges` table.
  });

  if (!challenge) {
    // If the challenge is not found in the database, throw an error.
    throw new Error("Challenge not found");
  }

  const lessonId = challenge.lessonId;
  // Extracting the `lessonId` from the challenge data for later revalidation.

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
    // Check if the user has already started this challenge by looking for an existing entry
    // in the `challengeProgress` table with the current `userId` and `challengeId`.
  });

  const isPractice = !!existingChallengeProgress;
  // `isPractice` is true if there is an existing challenge progress, indicating the user
  // is practicing a completed challenge rather than attempting it for the first time.

  if (
    currentUserProgress.hearts === 0 &&
    !isPractice &&
    !userSubscription?.isActive
    // Check if the user has no hearts left, is attempting the challenge for the first time
    // (not practicing), and does not have an active subscription. If true, prevent challenge attempt.
  ) {
    return { error: "hearts" };
    // If the user is out of hearts and doesn't have an active subscription, return an error
    // indicating that the user cannot proceed.
  }

  if (isPractice) {
    // If the user is practicing an already completed challenge:
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));
    // Mark the challenge as completed again (if it wasn't already marked).

    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        // Add one heart (but not exceeding 5).
        points: currentUserProgress.points + 10,
        // Add 10 points to the user's progress.
      })
      .where(eq(userProgress.userId, userId));
    // Update the user's progress (hearts and points) in the `userProgress` table.

    // Revalidate the paths that need to be updated on the client-side after progress updates:
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);

    return;
  }

  // If the user is attempting the challenge for the first time:
  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
    // Insert a new entry into the `challengeProgress` table, marking the challenge as completed.
  });

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
      // Add 10 points to the user's progress for completing the challenge.
    })
    .where(eq(userProgress.userId, userId));
  // Update the user's progress in the `userProgress` table.

  // Revalidate the paths that need to be updated after challenge completion:
  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};
