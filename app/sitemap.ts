export default async function sitemap() {
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
    url: `https://ab-languages.vercel.app${route}`, // TODO
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes];
}
