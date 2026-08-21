import { type ReactNode } from "react";

/**
 * Smooth page transition — a short fade-and-rise on enter.
 *
 * The caller keys this node on the route, so React remounts it on every
 * navigation and the CSS animation replays. Enter-only: an exit animation
 * requires keeping the outgoing tree mounted, which costs an animation
 * library and a frame of jank for motion nobody notices.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
