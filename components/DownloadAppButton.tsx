"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const DownloadAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  const handleDownload = () => {
    if (deferredPrompt) {
      // @ts-ignore: There no specific type for "beforeInstallPrompt" event.
      deferredPrompt.prompt();
    } else {
      toast.success(
        `To install the app look for "Add to Homescreen" or install in your browser's menu.`
      );
    }
  };
  useEffect(() => {
    const handleBIP = (e: Event) => {
      e.preventDefault();

      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBIP);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBIP);
    };
  }, []);

  return (
    // <Button
    //   variant="secondary"
    //   className="download-btn"
    //   onClick={handleDownload}
    //   size="icon"
    // >
    //   <svg
    //     stroke="currentColor"
    //     fill="none"
    //     strokeWidth="2"
    //     viewBox="0 0 24 24"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     height="2em"
    //     width="2em"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    //     <polyline points="7 10 12 15 17 10"></polyline>
    //     <line x1="12" y1="15" x2="12" y2="3"></line>
    //   </svg>
    // </Button>
    <button className="botao" onClick={handleDownload}>
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mysvg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g id="Interface / Download">
            <path
              id="Vector"
              d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
              stroke="#f1f1f1"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>{" "}
        </g>
      </svg>
      <span className="texto">Download</span>
    </button>
  );
};

export default DownloadAppButton;
