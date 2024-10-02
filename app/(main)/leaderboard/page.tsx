import { 
  getAllSubscribedUser, // Fetches all users with active subscriptions
  getTopTenUsers, // Fetches the top ten users for the leaderboard
  getUserProgress, // Fetches the progress of the current user
  getUserSubscription, // Fetches subscription details of the current user
} from "@/db/queries";
import Image from "next/image"; // Next.js component for optimized image handling
import { redirect } from "next/navigation"; // Redirect utility from Next.js

// Importing components for rendering different sections of the page
import { FeedWrapper } from "@/components/FeedWrapper";
import { Promo } from "@/components/Promo";
import { Quests } from "@/components/Quests";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { Avatar, AvatarImage } from "@/components/ui/avatar"; // UI components for user avatars
import { Separator } from "@/components/ui/separator"; // UI component for visual separators

// Metadata for SEO and browser display
export const metadata = {
  title: "abLanguages | Leaderboard page", // Page title
  description: "Evaluate your progress compared to other learners in the community.", // Page description
};

// Async function for the leaderboard page
const LeaderBoardPage = async () => {
  // Fetching data concurrently using Promise.all for better performance
  const userProgressPromise = getUserProgress(); // Fetch current user's progress
  const userSubscriptionPromise = getUserSubscription(); // Fetch current user's subscription
  const leaderboardPromise = getTopTenUsers(); // Fetch the top 10 users for the leaderboard
  const allSubscribedUserPromise = getAllSubscribedUser(); // Fetch all users with active subscriptions

  // Waiting for all promises to resolve and retrieving their results
  const [userProgress, userSubscription, leaderboard, allSubscribedUser] =
    await Promise.all([
      userProgressPromise,
      userSubscriptionPromise,
      leaderboardPromise,
      allSubscribedUserPromise,
    ]);

  // If the user has no active course progress, redirect them to the courses page
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <main className="flex gap-12 px-6"> {/* Main container with flex layout for page structure */}
      <FeedWrapper> {/* Wrapper for the main leaderboard content */}
        <div className="w-full flex flex-col items-center"> {/* Flex container for content centering */}
          {/* Displaying the leaderboard icon */}
          <Image
            src="/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />

          {/* Leaderboard heading */}
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>

          {/* Leaderboard description */}
          <p className="text-muted-foreground text-center text-lg mb-6">
            Evaluate your progress compared to other learners in the community.
          </p>

          {/* Horizontal separator for visual distinction */}
          <Separator className="mb-4 h-0.5 rounded-full" />

          {/* Mapping over the leaderboard data to display each user */}
          {leaderboard.map((userProgress, i) => {
            // Checking if the user is a subscribed user
            const subscribedUser = allSubscribedUser?.find(
              (userId) => userId === userProgress.userId
            );

            return (
              <div
                key={userProgress.userId} // Unique key for each user in the list
                className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50" // Styling for each leaderboard entry
              >
                {/* Displaying the rank of the user */}
                <p className="font-bold text-lime-700 mr-4">{i + 1}</p>

                {/* Avatar for the user with custom styles */}
                <Avatar className="border bg-orange-500 h-12 w-12 ml-3 mr-6">
                  <AvatarImage
                    alt={userProgress.userName} // Alt text for accessibility
                    className="object-cover" // Ensure the image covers the container
                    src={userProgress.userImgSrc} // User's profile image source
                  />
                </Avatar>

                {/* Displaying the user's name with a verification tick if they are subscribed */}
                <p className="font-bold text-neutral-800 flex-1 flex gap-x-1 items-center">
                  {userProgress.userName}
                  {subscribedUser && (
                    <Image
                      src="/blue-tick.png" // Displaying a verification badge if subscribed
                      alt="Approval"
                      width={16}
                      height={16}
                    />
                  )}
                </p>

                {/* Displaying the user's points (XP) */}
                <p className="text-muted-foreground">
                  {userProgress.points} XP
                </p>
              </div>
            );
          })}
        </div>
      </FeedWrapper>

      {/* Sticky sidebar for displaying user progress and promotional content */}
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse} // User's active course
          hearts={userProgress.hearts} // User's available hearts (lives)
          points={userProgress.points} // User's total points
          hasActiveSubscription={!!userSubscription?.isActive} // Checking if the user has an active subscription
        />

        {/* Display promotional content if the user doesn't have an active subscription */}
        {!userSubscription?.isActive && <Promo />}

        {/* Display quests component with user progress points */}
        <Quests points={userProgress.points} />
      </StickyWrapper>
    </main>
  );
};

export default LeaderBoardPage; // Exporting the leaderboard page as default
