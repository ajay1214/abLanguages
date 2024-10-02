import { NextResponse } from "next/server"; // Import NextResponse for handling HTTP responses
import { eq } from "drizzle-orm"; // Import eq function for query conditions
import db from "@/db/drizzle"; // Import database instance
import { lessons } from "@/db/schema"; // Import lessons schema
import { isAdmin } from "@/lib/admin"; // Import isAdmin function to check admin status

// Handler for GET requests
export const GET = async (
  req: Request,
  { params }: { params: { lessonId: string } }
) => {
  // Check if the user is an admin, if not return unauthorized status
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Fetch the lesson from the database using the provided ID
  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, +params.lessonId),
  });

  // Return the fetched data as JSON
  return NextResponse.json(data);
};

// Handler for PUT requests
export const PUT = async (
  req: Request,
  { params }: { params: { lessonId: string } }
) => {
  // Check if the user is an admin, if not return unauthorized status
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Parse the request body
  const body = await req.json();

  // Update the lesson in the database with the provided data
  const data = await db
    .update(lessons)
    .set({
      ...body,
    })
    .where(eq(lessons.id, +params.lessonId))
    .returning();

  // Return the updated data as JSON
  return NextResponse.json(data[0]);
};

// Handler for DELETE requests
export const DELETE = async (
  req: Request,
  { params }: { params: { lessonId: string } }
) => {
  // Check if the user is an admin, if not return unauthorized status
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Delete the lesson from the database using the provided ID
  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, +params.lessonId))
    .returning();

  // Return the deleted data as JSON
  return NextResponse.json(data[0]);
};
