import { FC } from "react"; // Importing the FC (Function Component) type from React for type safety
import Image from "next/image"; // Importing the Image component from Next.js for optimized image rendering

// Defining the QuestionBubble component's props interface
interface QuestionBubbleProps {
  question: string; // The 'question' prop is a string that will be displayed in the component
}

// Creating the QuestionBubble functional component with props destructuring
export const QuestionBubble: FC<QuestionBubbleProps> = ({ question }) => {
  return (
    // A flex container to align items horizontally with a gap between them and a bottom margin
    <div className="flex items-center gap-x-4 mb-6">
      
      {/* Rendering an image using Next.js' Image component for optimized loading */}
      <Image
        src="/abLanguagesLogo.svg" // The source path for the image
        alt="abLanguagesLogo" // Alt text for accessibility
        width={60} // Setting the width of the image
        height={60} // Setting the height of the image
        className="size-10 lg:size-16" // Tailwind classes for responsive sizing
      />

      {/* A container for the question text with padding, borders, and rounded corners */}
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question} {/* Rendering the question text passed as a prop */}

        {/* Adding a speech bubble arrow using CSS borders */}
        <div className="absolute size-0 border-x-8 -left-3 top-1/2 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};
