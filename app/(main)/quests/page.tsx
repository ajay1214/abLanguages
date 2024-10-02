import { getUserProgress, getUserSubscription } from "@/db/queries"; // Import functions to get user progress and subscription data
import Image from "next/image"; // Next.js image component for optimized image handling
import { redirect } from "next/navigation"; // Function to handle client-side redirection

import { FeedWrapper } from "@/components/FeedWrapper"; // Component to provide layout wrapper for the content feed
import { Promo } from "@/components/Promo"; // Component for promotional content
import { StickyWrapper } from "@/components/StickyWrapper"; // Component to handle sticky positioning for specific elements
import { UserProgress } from "@/components/UserProgress"; // Component to display user's progress
import { Progress } from "@/components/ui/progress"; // Progress bar component for displaying quest completion status
import { quests } from "@/constants"; // Import quests data

export const metadata = {
  title: "abLanguages | Quests page", // Page title metadata for SEO and browser display
  description: "Finish quests to accumulate points.", // Page description metadata for SEO
};

// Asynchronous Quests page component
const QuestsPage = async () => {
  // Fetch user progress and subscription data simultaneously for efficiency
  const userProgressPromise = getUserProgress();
  const userSubscriptionPromise = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressPromise,
    userSubscriptionPromise,
  ]);

  // If no user progress or active course is available, redirect user to the courses page
  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  return (
    <main className="flex gap-12 px-6">
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          {/* Quests page header image */}
          <Image src="/quests.svg" alt="Quests" height={90} width={90} />

          {/* Quests title */}
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>

          {/* Quests description */}
          <p className="text-muted-foreground text-center text-lg mb-6">
            Finish quests to accumulate points.
          </p>

          {/* List of quests */}
          <ul className="w-full">
            {quests.map((quest, i) => {
              // Calculate quest progress percentage
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <li
                  key={quest.title}
                  className="flex items-center w-full gap-x-4 border-t-2 p-4"
                >
                  {/* Icon for quest points */}
                  <Image
                    src="/points.svg"
                    alt="Points"
                    height={60}
                    width={60}
                  />

                  {/* Quest title and progress bar */}
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 text-xl font-bold">
                      {quest.title}
                    </p>

                    {/* Progress bar showing quest completion percentage */}
                    <Progress value={progress} className="h-3" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
      <StickyWrapper>
        {/* User progress component displaying active course, hearts, points, and subscription status */}
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />

        {/* Promo component visible if the user doesn't have an active subscription */}
        {!userSubscription?.isActive && <Promo />}
      </StickyWrapper>
    </main>
  );
};

export default QuestsPage;
