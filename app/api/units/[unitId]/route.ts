import { NextResponse } from "next/server"; 
// Import Next.js response utilities to handle server-side responses
import { eq } from "drizzle-orm"; 
// Import 'eq' helper for creating SQL equality conditions
import db from "@/db/drizzle"; 
// Import the database connection instance from Drizzle ORM
import { units } from "@/db/schema"; 
// Import the 'units' schema to interact with the units table
import { isAdmin } from "@/lib/admin"; 
// Import a utility to check if the current user is an admin

// GET request handler for fetching a single unit by unitId
export const GET = async (
  req: Request,
  { params }: { params: { unitId: string } } 
  // Destructuring to extract the unitId from request parameters
) => {
  // Check if the current user is an admin, if not, return a 401 Unauthorized response
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Query the database to find the unit by its ID using the Drizzle ORM query builder
  const data = await db.query.units.findFirst({
    where: eq(units.id, +params.unitId), 
    // Convert unitId to a number using the '+' operator before querying
  });

  // Return the fetched data as a JSON response
  return NextResponse.json(data);
};

// PUT request handler for updating a unit by unitId
export const PUT = async (
  req: Request,
  { params }: { params: { unitId: string } } 
  // Destructuring to extract the unitId from request parameters
) => {
  // Check if the current user is an admin, if not, return a 401 Unauthorized response
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Parse the incoming JSON request body
  const body = await req.json();

  // Update the unit in the database by unitId with the new data from the request body
  const data = await db
    .update(units)
    .set({
      ...body, 
      // Spread the body object to update fields dynamically
    })
    .where(eq(units.id, +params.unitId)) 
    // Use 'where' to specify the unit by its ID
    .returning(); 
    // Return the updated row(s)

  // Return the first updated row as a JSON response
  return NextResponse.json(data[0]);
};

// DELETE request handler for deleting a unit by unitId
export const DELETE = async (
  req: Request,
  { params }: { params: { unitId: string } } 
  // Destructuring to extract the unitId from request parameters
) => {
  // Check if the current user is an admin, if not, return a 401 Unauthorized response
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Delete the unit from the database where the unitId matches the parameter
  const data = await db
    .delete(units)
    .where(eq(units.id, +params.unitId)) 
    // Use 'where' to specify the unit by its ID
    .returning(); 
    // Return the deleted row(s)

  // Return the first deleted row as a JSON response
  return NextResponse.json(data[0]);
};
