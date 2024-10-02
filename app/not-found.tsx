// Metadata for the Not Found page
export const metadata = {
  title: "abLanguages | Not found", // Title of the page displayed in the browser tab
  description: "This page could not be found.", // Description for the page
};

// Functional component for the Not Found page
const NotFound = () => {
  return (
    // Main container with full width and height
    <main className="w-screen h-screen flex justify-center items-center bg-white">
      <div className="flex items-center gap-x-4">
        {/* Displaying the 404 status code */}
        <span className="text-2xl font-bold p-4 border-r-2 border-orange-400">
          404
        </span>{" "}
        {/* Message indicating that the page could not be found */}
        This page could not be found.
      </div>
    </main>
  );
};

// Exporting the NotFound component as the default export
export default NotFound;
