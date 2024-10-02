import { Manifest } from "next/dist/lib/metadata/types/manifest-types"; // Importing the Manifest type from Next.js

// Exporting a default function that returns a manifest object
export default function manifest(): Manifest {
  return {
    name: "abLanguages", // Name of the application
    short_name: "abLanguages", // Short name of the application for display
    description: "abLanguages is an Advanced language learning application.", // Description of the application
    start_url: ".", // URL to start the application
    orientation: "portrait", // Default orientation of the application
    theme_color: "#22c55e", // Theme color for the application
    display: "standalone", // Display mode for the application
    scope: ".", // Scope of the application
    icons: [ // Icons for the application in various sizes
      {
        src: "/abLanguagesLogo.png", // Source path for the icon
        sizes: "192x192", // Size of the icon
        type: "image/png", // MIME type of the icon
        purpose: "any", // Purpose of the icon
      },
      {
        src: "/abLanguagesLogo.png", // Source path for the icon
        sizes: "512x512", // Size of the icon
        type: "image/png", // MIME type of the icon
        purpose: "any", // Purpose of the icon
      },
    ],
    background_color: "#ffffff", // Background color for the application
    screenshots: [ // Screenshots for the application
      {
        src: "/lingo_first.png", // Source path for the screenshot
        sizes: "800x500", // Size of the screenshot
        type: "image/png", // MIME type of the screenshot
        // @ts-ignore
        form_factor: "wide", // Form factor of the screenshot
      },
      {
        src: "/lingo_responsive.png", // Source path for the screenshot
        sizes: "381x831", // Size of the screenshot
        type: "image/png", // MIME type of the screenshot
      },
    ],
  };
}
