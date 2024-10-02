import { getUserProgress, getUserSubscription } from "@/db/queries"; 
// Importing functions to fetch user data (progress and subscription status) from the database

import Image from "next/image"; // Optimized image component from Next.js
import { redirect } from "next/navigation"; // To redirect users to different pages

import { FeedWrapper } from "@/components/FeedWrapper"; // Component that wraps the content feed
import { Promo } from "@/components/Promo"; // Promo component, likely displays promotions
import { Quests } from "@/components/Quests"; // Component for showing quests related to user points
import { StickyWrapper } from "@/components/StickyWrapper"; // Sticky wrapper for elements that need to remain in view while scrolling
import { UserProgress } from "@/components/UserProgress"; // Component showing user's progress
import dynamic from "next/dynamic"; // Dynamically imports components
import Items from "./components/Items"; // Importing the Items component from the local file system

// Dynamically import SubscriptionNote without server-side rendering (ssr: false)
const SubscriptionNote = dynamic(
  () => import("./components/SubscriptionNote"),
  { ssr: false }
);

export const metadata = {
  title: "abLanguages | Shopping page", // Meta title for SEO
  description:
    "Spend your points on cool stuff, or Get pro for unlimited hearts.", // Meta description for SEO
};

const ShopPage = async () => {
  // Fetch user progress and subscription data simultaneously using Promise.all
  const userProgressPromise = getUserProgress(); 
  const userSubscriptionPromise = getUserSubscription(); 

  const [userProgress, userSubscription] = await Promise.all([
    userProgressPromise,
    userSubscriptionPromise,
  ]); 
  // Destructure the results of both promises

  // Redirect to the /courses page if user progress or activeCourse is not found
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <main className="flex gap-12 px-6">
      <FeedWrapper> 
        {/* Content that is part of the main feed */}
        <div className="w-full flex flex-col items-center">
          <Image src="/shop.svg" alt="Shop" height={90} width={90} /> 
          {/* Shop icon at the top */}

          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>

          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on great items.
          </p>

          {/* Pass user data (hearts, points, subscription) to the Items component */}
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={!!userSubscription?.isActive}
          />
        </div>

        <SubscriptionNote /> 
        {/* Subscription note component (only visible if needed) */}
      </FeedWrapper>

      <StickyWrapper>
        {/* Content that stays fixed in view while scrolling */}
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />

        {!userSubscription?.isActive && <Promo />} 
        {/* Promo shown if user doesn't have an active subscription */}

        <Quests points={userProgress.points} /> 
        {/* Show user quests based on their points */}
      </StickyWrapper>
    </main>
  );
};

export default ShopPage;
