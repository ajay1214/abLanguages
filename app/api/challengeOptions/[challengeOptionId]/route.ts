import { NextResponse } from "next/server"; // Import NextResponse for handling responses
import { eq } from "drizzle-orm"; // Import eq function for query conditions
import db from "@/db/drizzle"; // Import database instance
import { challengeOptions } from "@/db/schema"; // Import challengeOptions schema
import { isAdmin } from "@/lib/admin"; // Import isAdmin function from admin library

// Handler for GET requests
export const GET = async (
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) => {
  // Check if the user is an admin, if not return unauthorized status
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Fetch the challenge option from the database using the provided ID
  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, +params.challengeOptionId),
  });

  // Return the fetched data as JSON
  return NextResponse.json(data);
};

// Handler for PUT requests
export const PUT = async (
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) => {
  // Check if the user is an admin, if not return unauthorized status
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Parse the request body
  const body = await req.json();

  // Update the challenge option in the database with the provided data
  const data = await db
    .update(challengeOptions)
    .set({
      ...body,
    })
    .where(eq(challengeOptions.id, +params.challengeOptionId))
    .returning();

  // Return the updated data as JSON
  return NextResponse.json(data[0]);
};

// Handler for DELETE requests
export const DELETE = async (
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) => {
  // Check if the user is an admin, if not return unauthorized status
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Delete the challenge option from the database using the provided ID
  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, +params.challengeOptionId))
    .returning();

  // Return the deleted data as JSON
  return NextResponse.json(data[0]);
};
