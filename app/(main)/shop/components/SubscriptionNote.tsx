"use client"; // Ensures this component is rendered on the client side

import { X } from "lucide-react"; // Importing an 'X' icon from the lucide-react icon library
import { useEffect, useRef, useState } from "react"; // React hooks for handling state, side effects, and refs

const SubscriptionNote = () => {
  const [subscriptionNote, setSubscriptionNote] = useState<string | null>(null); 
  // State to track the visibility of the subscription note

  const divRef = useRef<HTMLDivElement>(null); 
  // Ref to access the div element directly in DOM manipulations

  const handleClick = () => { 
    // Function to handle the click event when the user closes the subscription note
    if (!divRef.current) return; 
    // Safety check to ensure the divRef is available

    divRef.current.classList.add("opacity-0"); 
    // Adds a class to trigger opacity animation for fade-out effect

    setTimeout(() => { 
      // Delay added to ensure the opacity transition happens before hiding
      divRef.current && divRef.current.classList.add("hidden"); 
      // Adds "hidden" class to remove the element from view after the fade-out

      localStorage.setItem("subscriptionNote", "hidden"); 
      // Saves the "hidden" state to localStorage so that the note is not shown again

      setSubscriptionNote(localStorage.getItem("subscriptionNote")); 
      // Updates state with the latest value from localStorage
    }, 300); 
    // 300ms delay matches the transition duration for smooth UX
  };

  useEffect(() => {
    // Runs when the component is mounted to set the initial state
    if (!localStorage.getItem("subscriptionNote")) { 
      // If no subscription note status is found in localStorage, initialize it
      localStorage.setItem("subscriptionNote", "visible");
      setSubscriptionNote(localStorage.getItem("subscriptionNote"));
    }

    setSubscriptionNote(localStorage.getItem("subscriptionNote")); 
    // Ensures the state is synced with localStorage on component load
  }, []);

  return (
    <>
      {subscriptionNote === "visible" && ( 
      // Conditionally renders the subscription note if its status is "visible"
        <div
          className="w-full p-4 pt-6 relative border border-orange-500 bg-orange-400/30 rounded-md mt-6 transition duration-300"
          ref={divRef}
        >
          <X
            className="absolute top-1 right-1 text-neutral-500 cursor-pointer"
            onClick={handleClick}
          />
          {/* Close button using the 'X' icon with an onClick event to hide the note */}

          {/* Message body explaining the Stripe test card */}
          Stripe is in development mode, which means You don't need to actually
          pay for Subscription. just simply use this{" "}
          <span className="text-md font-bold">4242-4242-4242-4242</span> card
          number and add a valid Expiration (for example: 06 / 30).
        </div>
      )}
    </>
  );
};

export default SubscriptionNote;
