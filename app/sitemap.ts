// Function to generate the sitemap asynchronously
export default async function sitemap() {
  // Array of static routes for the sitemap
  const staticRoutes = [
    "",
    "/courses",
    "/leaderboard",
    "/learn",
    "/quests",
    "/shop",
    "/admin",
    "/lesson",
  ].map((route) => ({
    // Constructing the full URL for each route
    url: `https://ab-languages.vercel.app${route}`, // TODO: Ensure this URL is accurate and reflects the current deployment
    lastModified: new Date().toISOString(), // Setting the last modified date to the current date
  }));

  // Returning the array of static routes for the sitemap
  return [...staticRoutes];
}
