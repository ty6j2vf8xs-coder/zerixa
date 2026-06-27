/** Matches fixed header height (h-16) plus breathing room — keep in sync with globals.css */
export const HEADER_SCROLL_OFFSET = 80;

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getScrollBehavior(
  override?: ScrollBehavior,
): ScrollBehavior {
  if (override) return override;
  return prefersReducedMotion() ? "auto" : "smooth";
}

export function scrollToElementId(
  id: string,
  behavior?: ScrollBehavior,
): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const top =
    el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: getScrollBehavior(behavior),
  });
  return true;
}

export function scrollToTop(behavior?: ScrollBehavior) {
  window.scrollTo({ top: 0, behavior: getScrollBehavior(behavior) });
}
