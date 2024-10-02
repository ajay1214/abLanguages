import { redirect } from "next/navigation"; // Import redirect function from next/navigation
import dynamic from "next/dynamic"; // Import dynamic function to enable dynamic imports
import { isAdmin } from "@/lib/admin"; // Import isAdmin function from admin library

// Dynamically import the App component with no server-side rendering (ssr)
const App = dynamic(() => import("./App"), { ssr: false });

// Metadata for the admin page
export const metadata = {
  title: "abLanguages | Admin page", // Page title
  description: "Only admins can access this page.", // Page description
};

// Admin page component
const AdminPage = () => {
  // Redirect to the home page if the user is not an admin
  if (!isAdmin()) {
    redirect("/");
  }

  return (
    <main>
      {/* Render the dynamically imported App component */}
      <App />
    </main>
  );
};

export default AdminPage; // Export AdminPage component as default
