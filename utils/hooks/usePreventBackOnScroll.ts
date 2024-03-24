"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

///CHROME SETTINGS
//REFER TO https://therightstuff.medium.com/how-to-disable-brave-chrome-gestures-on-macos-b9a7b846b1e1#:~:text=On%20MacOS%20it's%20possible%20to,like%20it's%20done%20the%20trick!

export default function usePreventBackOnScroll() {
  // const router = useRouter();
  // useEffect(() => {
  //   //prevent going back
  //   window.history.pushState(null, document.title, window.location.href);
  //   window.addEventListener("popstate", () => {
  //     window.history.pushState(null, document.title, window.location.href);
  //   });
  // }, [router]);
  // useEffect(() => {
  //   let pushed = false;
  //   const handleScroll = () => {
  //     // Assuming the scrollable element is the window; adjust if it's a specific element
  //     const atStartOfPage = window.scrollY === 0;
  //     if (atStartOfPage && !pushed) {
  //       // Temporarily push a state into history at the start of the page
  //       window.history.pushState(null, document.title);
  //       pushed = true;
  //     } else if (!atStartOfPage && pushed) {
  //       // Once the user scrolls away from the start, go back in history to remove the pushed state
  //       window.history.back();
  //       pushed = false;
  //     }
  //   };
  //   // Listen for scroll events
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     // Cleanup by going back in history if we pushed a state
  //     if (pushed) {
  //       window.history.back();
  //     }
  //   };
  // }, []);
}
