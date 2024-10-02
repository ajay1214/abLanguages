// Importing the required packages for database interaction
import { neon } from "@neondatabase/serverless"; // Neon serverless database client
import { drizzle } from "drizzle-orm/neon-http"; // Drizzle ORM for database management

// Importing the schema definition from the schema file
import * as schema from "./schema";

// Initializing the Neon database client with the database URL from environment variables
const sql = neon(process.env.DATABASE_URL!);

// Creating a Drizzle ORM instance with the Neon SQL client and the schema
const db = drizzle(sql, { schema });

// Exporting the database instance for use in other modules
export default db;
