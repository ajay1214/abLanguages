"use server";

import { auth, currentUser } from "@clerk/nextjs/server"; // Clerk authentication to get current user

import { getUserSubscription } from "@/db/queries"; // Function to retrieve user's subscription details
import { stripe } from "@/lib/stripe"; // Stripe for payment and billing-related functions
import { absoluteUrl } from "@/lib/utils"; // Utility function to create absolute URLs

const returnUrl = absoluteUrl("/shop"); // Return URL after successful payment

// Function to create a Stripe session URL for subscription or billing portal
export const createStripeUrl = async () => {
  const { userId } = auth(); // Get the authenticated user's ID
  const user = await currentUser(); // Get the current user object from Clerk

  // If user is not authenticated, throw an error
  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const userSubscription = await getUserSubscription(); // Retrieve user's subscription details from the database

  // If the user already has a Stripe customer ID (active subscription), create a billing portal session
  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId, // The Stripe customer ID associated with the user
      return_url: returnUrl, // URL to return to after managing subscription
    });

    return { data: stripeSession.url }; // Return the URL to access the billing portal
  }

  // If no active subscription, create a new checkout session for subscription
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription", // Specifies the session mode (here it's for subscription)
    payment_method_types: ["card"], // Accept only card payments
    customer_email: user.emailAddresses[0].emailAddress, // Use the user's email for the Stripe checkout
    line_items: [
      {
        quantity: 1, // Single subscription purchase
        price_data: {
          currency: "USD", // Currency used for the subscription
          product_data: {
            name: "abLanguages Pro", // Product name shown on Stripe checkout
            description: "Unlimited Hearts", // Product description for the user
          },
          unit_amount: 200, // Price in cents ($2.00 USD)
          recurring: {
            interval: "month", // Billing interval (monthly subscription)
          },
        },
      },
    ],
    metadata: {
      userId, // Attach userId to the session for future reference
    },
    success_url: returnUrl, // Redirect to the shop on success
    cancel_url: returnUrl, // Redirect to the shop on cancellation
  });

  return { data: stripeSession.url }; // Return the Stripe checkout session URL
};
