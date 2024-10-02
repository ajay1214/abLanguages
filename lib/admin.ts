import { auth } from "@clerk/nextjs/server"; // Importing Clerk's authentication module

export const isAdmin = () => {
  // Destructuring to get the userId from Clerk's auth object
  const { userId } = auth();

  // If userId is not present (user is not authenticated), return false
  if (!userId) return false;

  // Compare userId with the ADMIN_ID from environment variables to check if the user is an admin
  return process.env.ADMIN_ID === userId ? true : false;
};
