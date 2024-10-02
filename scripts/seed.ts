import "dotenv/config"; // Importing dotenv to load environment variables
import { drizzle } from "drizzle-orm/neon-http"; // Importing Drizzle ORM to work with Neon
import { neon } from "@neondatabase/serverless"; // Importing Neon for serverless database connection

import * as schema from "../db/schema"; // Importing all database schema models

import { dataToInsert } from "@/constants"; // Importing data to insert from a constants file

// Initializing the Neon connection using the DATABASE_URL from environment variables
const sql = neon(process.env.DATABASE_URL!);

// Initializing Drizzle ORM with the SQL connection and the schema
const db = drizzle(sql, { schema });

// Self-invoking async function to seed the database
(async () => {
  try {
    console.log("Seeding db"); // Logging the start of the seeding process

    // Deleting existing data from the respective tables before seeding
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.units);
    await db.delete(schema.lessons);

    // Inserting new data into the corresponding tables
    await db.insert(schema.courses).values(dataToInsert.languages); // Inserting languages data into courses table
    await db.insert(schema.units).values(dataToInsert.units); // Inserting units data
    await db.insert(schema.lessons).values(dataToInsert.lessons); // Inserting lessons data
    await db.insert(schema.challenges).values(dataToInsert.challenges as any); // Inserting challenges data (casting as any for type safety)
    await db.insert(schema.challengeOptions).values(dataToInsert.challengeOptions); // Inserting challenge options

    console.log("Seeding finished"); // Logging the successful completion of the seeding
  } catch (error) {
    console.error(error); // Logging any errors that occur during the seeding process
    throw new Error("Failed to seed the database"); // Throwing a custom error message if something goes wrong
  }
})();
