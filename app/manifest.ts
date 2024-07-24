import { Manifest } from "next/dist/lib/metadata/types/manifest-types";

export default function manifest(): Manifest {
  return {
    name: "abLanguages",
    short_name: "abLanguages",
    description: "abLanguages is an Advanced language learning application.",
    start_url: ".",
    orientation: "portrait",
    theme_color: "#22c55e",
    display: "standalone",
    scope: ".",
    icons: [
      {
        src: "/abLanguagesLogo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/abLanguagesLogo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    background_color: "#ffffff",
    screenshots: [
      {
        src: "/lingo_first.png",
        sizes: "800x500",
        type: "image/png",
        // @ts-ignore
        form_factor: "wide",
      },
      {
        src: "/lingo_responsive.png",
        sizes: "381x831",
        type: "image/png",
      },
    ],
  };
}
