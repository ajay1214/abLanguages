import { NextResponse } from "next/server"; // Import NextResponse for handling HTTP responses

import db from "@/db/drizzle"; // Import database instance
import { isAdmin } from "@/lib/admin"; // Import isAdmin function to check admin status
import { challengeOptions } from "@/db/schema"; // Import challengeOptions schema

// Handler for GET requests
export const GET = async () => {
  // Check if the user is an admin, if not return unauthorized status
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Fetch all challenge options from the database
  const data = await db.query.challengeOptions.findMany();

  // Return the fetched data as JSON
  return NextResponse.json(data);
};

// Handler for POST requests
export const POST = async (req: Request) => {
  // Check if the user is an admin, if not return unauthorized status
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Parse the request body
  const body = await req.json();

  // Insert the new challenge option into the database
  const data = await db
    .insert(challengeOptions)
    .values({
      ...body,
    })
    .returning();

  // Return the newly inserted data as JSON
  return NextResponse.json(data[0]);
};
