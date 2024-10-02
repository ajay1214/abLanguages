"use client"; // Indicates this component is client-side only

import { Button } from "@/components/ui/button"; // Importing the Button component

// Defining the HomePageError component that accepts 'err' and 'reset' as props
const HomePageError = ({ err, reset }: { err: Error; reset: () => void }) => {
  return (
    <div className="w-screen h-screen flex flex-col gap-y-4 justify-center items-center fixed top-0 left-0 z-[10000] bg-white/55 backdrop-blur-sm">
      {/* Wrapper div for the error page, with full-screen size and center alignment */}
      <h1 className="text-2xl font-thin text-dark-400 text-center">
        {/* Displaying the error message, or a default message if none is provided */}
        {err?.message || "Something went wrong !"}
      </h1>
      <div className="flex gap-x-4 items-center">
        {/* Flex container for the buttons with some gap between them */}
        <Button className="w-28" variant="secondaryOutline" onClick={reset}>
          Try again {/* Button to retry the action, calls the reset function */}
        </Button>

        <Button
          className="w-28" // A button to reload the page
          variant="secondary"
          onClick={() => window.location.reload()} // Reloading the page on click
        >
          Reload
        </Button>
      </div>
    </div>
  );
};

export default HomePageError; // Exporting the HomePageError component as the default export
