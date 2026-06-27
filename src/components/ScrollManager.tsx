"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToElementId } from "@/lib/scroll";

function scrollToCurrentHash(instant: boolean) {
  const hash = window.location.hash;
  if (!hash) return;

  const id = decodeURIComponent(hash.slice(1));
  let attempts = 0;

  const tryScroll = () => {
    if (scrollToElementId(id, instant ? "auto" : undefined)) return;
    if (attempts < 12) {
      attempts += 1;
      window.setTimeout(tryScroll, 100);
    }
  };

  tryScroll();
}

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToCurrentHash(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToCurrentHash(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
