"use client"; 
// Directive that tells Next.js that this file is client-side code, necessary for hooks like useTransition

import { useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { refillHearts } from "@/actions/userProgress";
import { createStripeUrl } from "@/actions/userSubscription";
import { Button } from "@/components/ui/button";

type Props = {
  hearts: number;               // The current number of hearts the user has
  points: number;               // The current number of points the user has
  hasActiveSubscription: boolean; // Boolean flag indicating if the user has an active subscription
};

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition();
  // useTransition is used for non-urgent state transitions. Pending is a flag indicating if a transition is happening.
  
  const handleRefillHearts = () => {
    // Prevent action if already pending, hearts are full, or points are insufficient
    if (pending || hearts === 5 || points < 50) {
      return;
    }

    // Trigger the action to refill hearts
    startTransition(() => {
      refillHearts()
        .then(() => toast.success("Hearts successfully refilled !"))  // Success message if refill is successful
        .catch(() => toast.error("Something went wrong !"));          // Error message if something fails
    });
  };

  const handleUpgrade = () => {
    // Transition for upgrading to a subscription
    startTransition(() => {
      createStripeUrl()
        .then((res) => {
          if (res.data) {
            window.location.href = res.data;   // Redirects user to the Stripe checkout URL for upgrading
          }
        })
        .catch(() => toast.error("Subscription failed !"));  // Error message if subscription upgrade fails
    });
  };

  return (
    <ul className="w-full">
      {/* List item for refilling hearts */}
      <li className="flex items-center w-full p-4 gap-x-4 border-t-2">
        {/* Heart icon */}
        <Image src="/heart.svg" alt="Heart" width={60} height={60} />

        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts !
          </p>
        </div>

        {/* Button for refilling hearts, disabled if action is pending, hearts are full, or points are insufficient */}
        <Button
          onClick={handleRefillHearts}
          disabled={pending || hearts === 5 || points < 50}
        >
          {hearts === 5 ? (
            "full"  // Displays "full" if the user already has 5 hearts
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>50</p> {/* Shows that refilling hearts costs 50 points */}
            </div>
          )}
        </Button>
      </li>

      {/* List item for upgrading to unlimited hearts (subscription) */}
      <li className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        {/* Unlimited hearts icon */}
        <Image src="/unlimited.svg" alt="Unlimited" height={60} width={60} />

        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            You can get Unlimited Hearts !
          </p>
        </div>

        {/* Button for subscription upgrade, changes to "settings" if user has an active subscription */}
        <Button disabled={pending} onClick={handleUpgrade}>
          {hasActiveSubscription ? "settings" : "upgrade"}
        </Button>
      </li>
    </ul>
  );
};
export default Items;
