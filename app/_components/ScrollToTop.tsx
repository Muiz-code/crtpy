"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    // If a saved scroll position exists, skip scroll-to-top so the
    // destination page can restore it after its own render cycle.
    if (sessionStorage.getItem("landingScrollY")) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
