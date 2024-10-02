import { neon } from "@neondatabase/serverless"; // Importing Neon serverless database package
import "dotenv/config"; // Loading environment variables from a .env file
import { drizzle } from "drizzle-orm/neon-http"; // Importing Drizzle ORM to work with Neon

import * as schema from "../db/schema"; // Importing all database schema models from the specified file

// Initializing the Neon connection using the DATABASE_URL from environment variables
const sql = neon(process.env.DATABASE_URL!);

// Initializing Drizzle ORM with the SQL connection and the schema
const db = drizzle(sql, { schema });

// Self-invoking async function to reset the database
(async () => {
  try {
    console.log("Resetting the db"); // Logging the start of the reset process

    // Deleting all data from the respective tables in the database, following the correct order to avoid foreign key conflicts
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.userSubscription);

    console.log("Resetting finished"); // Logging the successful completion of the reset
  } catch (error) {
    console.error(error); // Logging any errors that occur during the reset process
    throw new Error("Failed to Reset the database"); // Throwing a custom error message if something goes wrong
  }
})();
