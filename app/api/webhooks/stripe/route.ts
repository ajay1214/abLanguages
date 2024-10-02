import db from "@/db/drizzle"; 
// Importing the Drizzle ORM database instance

import { userSubscription } from "@/db/schema"; 
// Importing the 'userSubscription' schema to interact with the subscription table

import { stripe } from "@/lib/stripe"; 
// Importing the initialized Stripe instance for API interaction

import { eq } from "drizzle-orm"; 
// Importing the 'eq' helper from Drizzle ORM to create SQL equality conditions

import { headers } from "next/headers"; 
// Importing a utility to access request headers in Next.js

import { NextResponse } from "next/server"; 
// Importing Next.js response utilities for server-side responses

import Stripe from "stripe"; 
// Importing the Stripe types from the Stripe package

// POST request handler to process Stripe webhook events
export async function POST(req: Request) {
  // Read the raw body of the incoming request
  const body = await req.text();

  // Extract the Stripe-Signature from the request headers
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    // Verify the webhook signature to ensure it's from Stripe
    event = stripe.webhooks.constructEvent(
      body, 
      signature, 
      process.env.STRIPE_WEBHOOK_SECRET! 
      // Using the Stripe webhook secret to validate the event
    );
  } catch (err: any) {
    // If validation fails, return a 400 error response
    return new NextResponse(`Webhook error: ${err.message}`, {
      status: 400,
    });
  }

  // Cast the event's object to a Stripe Checkout Session
  const session = event.data.object as Stripe.Checkout.Session;

  // Handle checkout session completion event
  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string 
      // Cast subscription ID as string for the Stripe API call
    );

    // If the session metadata doesn't contain a user ID, return an error
    if (!session?.metadata?.userId) {
      return new NextResponse("User ID is required!", { status: 400 });
    }

    // Insert a new subscription record into the database
    await db.insert(userSubscription).values({
      userId: session.metadata.userId, 
      // User ID from the metadata in the session

      stripeSubscriptionId: subscription.id, 
      // Stripe subscription ID

      stripeCustomerId: subscription.customer as string, 
      // Stripe customer ID

      stripePriceId: subscription.items.data[0].price.id, 
      // Stripe price ID for the subscription

      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000), 
      // Convert the Unix timestamp to a JavaScript date object
    });
  }

  // Handle successful subscription payment (invoice payment succeeded)
  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription again to update the information
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the existing subscription record in the database
    await db
      .update(userSubscription)
      .set({
        stripePriceId: subscription.items.data[0].price.id, 
        // Update the price ID

        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000), 
        // Update the subscription's period end date
      })
      .where(eq(userSubscription.stripeSubscriptionId, subscription.id)); 
      // Ensure we're updating the correct subscription by matching Stripe's subscription ID
  }

  // Return a 200 OK response to acknowledge the webhook event
  return new NextResponse(null, { status: 200 });
}
