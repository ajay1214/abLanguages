import { relations } from "drizzle-orm"; // Importing relations utility from drizzle-orm
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core"; // Importing types for PostgreSQL schema definition

// Defining the courses table schema
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(), // Primary key for course ID
  title: text("title").notNull(), // Title of the course (must not be null)
  imgSrc: text("img_src").notNull(), // Image source for the course (must not be null)
});

// Defining relationships for the courses table
export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress), // A course can have many user progress entries
  units: many(units), // A course can have many units
}));

// Defining the units table schema
export const units = pgTable("units", {
  id: serial("id").primaryKey(), // Primary key for unit ID
  title: text("title").notNull(), // Title of the unit (must not be null)
  description: text("description").notNull(), // Description of the unit (must not be null)
  courseId: integer("course_id")
    .references(() => courses.id, {
      onDelete: "cascade", // If a course is deleted, delete related units
    })
    .notNull(), // Foreign key to courses table (must not be null)
  order: integer("order").notNull(), // Order of the unit (must not be null)
});

// Defining relationships for the units table
export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId], // Mapping unit to its course
    references: [courses.id], // Reference to the courses table
  }),
  lessons: many(lessons), // A unit can have many lessons
}));

// Defining the lessons table schema
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(), // Primary key for lesson ID
  title: text("title").notNull(), // Title of the lesson (must not be null)
  unitId: integer("unit_id")
    .references(() => units.id, { onDelete: "cascade" }) // Foreign key to units table
    .notNull(), // (must not be null)
  order: integer("order").notNull(), // Order of the lesson (must not be null)
});

// Defining relationships for the lessons table
export const lessonsRelations = relations(lessons, ({ many, one }) => ({
  unit: one(units, {
    fields: [lessons.unitId], // Mapping lesson to its unit
    references: [units.id], // Reference to the units table
  }),
  challenges: many(challenges), // A lesson can have many challenges
}));

// Defining an enum for challenge types
export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]); // Types of challenges

// Defining the challenges table schema
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(), // Primary key for challenge ID
  lessonId: integer("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" }) // Foreign key to lessons table
    .notNull(), // (must not be null)
  type: challengesEnum("type").notNull(), // Challenge type (must not be null)
  question: text("question").notNull(), // Question text (must not be null)
  order: integer("order").notNull(), // Order of the challenge (must not be null)
});

// Defining relationships for the challenges table
export const challengesRelations = relations(challenges, ({ many, one }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId], // Mapping challenge to its lesson
    references: [lessons.id], // Reference to the lessons table
  }),
  challengeOptions: many(challengeOptions), // A challenge can have many options
  challengeProgress: many(challengeProgress), // A challenge can have many progress entries
}));

// Defining the challenge options table schema
export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(), // Primary key for challenge option ID
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" }) // Foreign key to challenges table
    .notNull(), // (must not be null)
  text: text("text").notNull(), // Text of the challenge option (must not be null)
  correct: boolean("correct").notNull(), // Boolean indicating if the option is correct (must not be null)
  imgSrc: text("img_src"), // Optional image source for the option
  audioSrc: text("audio_src"), // Optional audio source for the option
});

// Defining relationships for the challenge options table
export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId], // Mapping option to its challenge
      references: [challenges.id], // Reference to the challenges table
    }),
  })
);

// Defining the challenge progress table schema
export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(), // Primary key for challenge progress ID
  userId: text("user_id").notNull(), // User ID associated with the challenge progress (must not be null)
  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" }) // Foreign key to challenges table
    .notNull(), // (must not be null)
  completed: boolean("completed").notNull().default(false), // Boolean indicating if the challenge is completed (default: false)
});

// Defining relationships for the challenge progress table
export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId], // Mapping progress to its challenge
      references: [challenges.id], // Reference to the challenges table
    }),
  })
);

// Defining the user progress table schema
export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(), // Primary key for user ID
  userName: text("user_name").notNull().default("ajaykUser"), // User name (default: "ajaykUser")
  userImgSrc: text("user_profile").notNull().default("/abLanguagesLogo.svg"), // User profile image source (default: "/abLanguagesLogo.svg")
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade", // If a course is deleted, set active course ID to null
  }),
  hearts: integer("hearts").notNull().default(5), // Number of hearts (default: 5)
  points: integer("points").notNull().default(0), // Number of points (default: 0)
});

// Defining relationships for the user progress table
export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId], // Mapping user progress to its active course
    references: [courses.id], // Reference to the courses table
  }),
}));

// Defining the user subscription table schema
export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(), // Primary key for subscription ID
  userId: text("user_id").notNull().unique(), // User ID associated with the subscription (must be unique)
  stripeCustomerId: text("stripe_customer_id").notNull().unique(), // Unique Stripe customer ID
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(), // Unique Stripe subscription ID
  stripePriceId: text("stripe_price_id").notNull(), // Stripe price ID for the subscription
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(), // End date of the current subscription period (must not be null)
});
