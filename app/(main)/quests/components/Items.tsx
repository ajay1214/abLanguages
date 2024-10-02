"use client"; // Indicates that this component is a client component for use in a Next.js app

import { useTransition } from "react"; // React hook to manage UI transitions for state updates
import Image from "next/image"; // Next.js image component for optimized image rendering
import { toast } from "sonner"; // Toast library for notifications
import { refillHearts } from "@/actions/userProgress"; // Action to refill hearts for user progress
import { createStripeUrl } from "@/actions/userSubscription"; // Action to create Stripe payment URL
import { Button } from "@/components/ui/button"; // Button component from UI library

// Props type definition to clearly specify the props expected by this component
type Props = {
  hearts: number; // Number of hearts the user currently has
  points: number; // Number of points the user currently has
  hasActiveSubscription: boolean; // Boolean indicating if the user has an active subscription
};

// Items component implementation
const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  // `useTransition` hook returns `pending` and `startTransition`
  // `pending` indicates whether the transition is in progress
  // `startTransition` is a function to begin the transition
  const [pending, startTransition] = useTransition();

  // Function to handle the refill hearts logic
  const handleRefillHearts = () => {
    // Check if a refill is already pending, hearts are already full, or insufficient points
    if (pending || hearts === 5 || points < 50) {
      return;
    }

    // Initiate the refill action with a UI transition effect
    startTransition(() => {
      refillHearts()
        .then(() => toast.success("Hearts successfully refilled !")) // Success notification
        .catch(() => toast.error("Something went wrong !")); // Error notification
    });
  };

  // Function to handle the upgrade to subscription logic
  const handleUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((res) => {
          if (res.data) {
            window.location.href = res.data; // Redirect user to the Stripe URL for subscription
          }
          toast.success("Subscription was successful"); // Success notification for upgrade
        })
        .catch(() => toast.error("Subscription failed !")); // Error notification
    });
  };

  return (
    <ul className="w-full">
      {/* Item for refilling hearts */}
      <li className="flex items-center w-full p-4 gap-x-4 border-t-2">
        {/* Heart Icon */}
        <Image src="/heart.svg" alt="Heart" width={60} height={60} />

        {/* Description about refilling hearts */}
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts !
          </p>
        </div>

        {/* Button to initiate refill hearts */}
        <Button
          onClick={handleRefillHearts}
          disabled={pending || hearts === 5 || points < 50} // Disable button if pending, hearts full, or insufficient points
        >
          {/* If hearts are full, show 'full' text; otherwise, show refill points information */}
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} /> {/* Points Icon */}
              <p>50</p> {/* Cost of refilling hearts */}
            </div>
          )}
        </Button>
      </li>

      {/* Item for upgrading to unlimited hearts */}
      <li className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        {/* Unlimited hearts icon */}
        <Image src="/unlimited.svg" alt="Unlimited" height={60} width={60} />

        {/* Description about upgrading for unlimited hearts */}
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            You Can get Unlimited Hearts by upgrading
          </p>
        </div>

        {/* Button to handle upgrade */}
        <Button disabled={pending} onClick={handleUpgrade}>
          {hasActiveSubscription ? "settings" : "upgrade"} {/* Change button text based on subscription status */}
        </Button>
      </li>
    </ul>
  );
};

export default Items;
