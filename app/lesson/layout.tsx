import { Metadata } from "next"; // Importing the Metadata type from Next.js

// Defining the metadata for the Lesson page
export const metadata: Metadata = {
  title: "abLanguages | Lesson page", // The title of the lesson page
  description: "Here, you can start your lesson right away !", // A brief description of the lesson page
};

// Defining the LessonLayout component that accepts 'children' as its prop
const LessonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col h-full"> {/* Main wrapper with full height and flex layout */}
      <section className="flex flex-col h-full w-full"> {/* Section for holding the children, spanning full width and height */}
        {children} {/* Rendering any child components passed into LessonLayout */}
      </section>
    </main>
  );
};

export default LessonLayout; // Exporting LessonLayout as the default export
