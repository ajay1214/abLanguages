import { NextResponse } from "next/server"; 
// Importing Next.js response utilities to handle server-side responses

import db from "@/db/drizzle"; 
// Importing the Drizzle ORM database connection instance

import { isAdmin } from "@/lib/admin"; 
// Utility function to check if the current user has admin privileges

import { units } from "@/db/schema"; 
// Importing the 'units' schema from the database to interact with the 'units' table

// GET request handler for retrieving all units from the database
export const GET = async () => {
  // Check if the current user is an admin; if not, return a 401 Unauthorized response
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Fetch all units from the database using Drizzle ORM's query builder
  const data = await db.query.units.findMany();

  // Return the fetched data as a JSON response
  return NextResponse.json(data);
};

// POST request handler for adding a new unit to the database
export const POST = async (req: Request) => {
  // Check if the current user is an admin; if not, return a 401 Unauthorized response
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Parse the incoming JSON request body to extract the unit data
  const body = await req.json();

  // Insert the new unit into the database using Drizzle ORM
  const data = await db
    .insert(units) 
    // Insert the values from the request body into the 'units' table
    .values({
      ...body, 
      // Spread the body to map all fields dynamically
    })
    .returning(); 
    // Return the newly inserted row(s)

  // Return the first inserted row as a JSON response
  return NextResponse.json(data[0]);
};
