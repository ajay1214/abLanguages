import { NextResponse } from "next/server"; // Import NextResponse for handling HTTP responses
import { eq } from "drizzle-orm"; // Import eq function for query conditions
import db from "@/db/drizzle"; // Import database instance
import { courses } from "@/db/schema"; // Import courses schema
import { isAdmin } from "@/lib/admin"; // Import isAdmin function to check admin status

// Handler for GET requests
export const GET = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  // Check if the user is an admin, if not return unauthorized status
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Fetch the course from the database using the provided ID
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, +params.courseId),
  });

  // Return the fetched data as JSON
  return NextResponse.json(data);
};

// Handler for PUT requests
export const PUT = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  // Check if the user is an admin, if not return unauthorized status
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Parse the request body
  const body = await req.json();

  // Update the course in the database with the provided data
  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, +params.courseId))
    .returning();

  // Return the updated data as JSON
  return NextResponse.json(data[0]);
};

// Handler for DELETE requests
export const DELETE = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  // Check if the user is an admin, if not return unauthorized status
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Delete the course from the database using the provided ID
  const data = await db
    .delete(courses)
    .where(eq(courses.id, +params.courseId))
    .returning();

  // Return the deleted data as JSON
  return NextResponse.json(data[0]);
};
