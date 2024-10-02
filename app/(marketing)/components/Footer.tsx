import Image from "next/image"; 
// Importing Image from Next.js for optimized image loading

import { Button } from "@/components/ui/button";
// Importing the Button component for usage in the footer

import { footerFlags } from "@/constants";
// Importing a constant, likely an array of flag objects, containing data for each flag (image and label)

const Footer = () => {
  return (
    // Footer container, which is a block element hidden on smaller screens and visible on larger screens (lg breakpoint)
    <footer className="h-20 w-full border-t-2 border-slate-200 p-2 hidden lg:block">
      {/* Main content container, flexbox for alignment and spacing */}
      <div className="max-w-screen-lg flex mx-auto items-center justify-evenly h-full">
        {/* Looping through the footerFlags array to generate flag buttons */}
        {footerFlags.map((flag) => (
          <Button
            // Defining button size and style using utility props
            size="lg"
            key={flag.label} // Ensuring each button has a unique key for React to identify
            variant="defaultOutline"
            className="w-full"
          >
            {/* Using Next.js Image component for optimized loading and rendering of the flag images */}
            <Image
              src={flag.src} // Path to the image source (URL or local path)
              alt={flag.label} // Alt text for accessibility, fetched from the flag object
              height={32} // Setting the height of the image
              width={40} // Setting the width of the image
              className="rounded-md mr-4 shadow-[0_0_5px_#999999]" // Applying custom classes for styling
              priority // Giving the image higher load priority
            />
            {flag.label} {/* Displaying the label text of the flag */}
          </Button>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
// Exporting the Footer component as default for use in other parts of the application
