import { useEffect } from "react";

const BASE_TITLE = "Orbtrix Space";

/**
 * Sets <title> and the meta description for a page, restoring both on unmount.
 * Replaces the ad-hoc DOM juggling the old Rigel OS page carried.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} — ${BASE_TITLE}` : BASE_TITLE;

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const existed = !!tag;
    const prevDesc = tag?.getAttribute("content") ?? null;

    if (description) {
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = "description";
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }

    return () => {
      document.title = prevTitle;
      if (!description || !tag) return;
      if (existed && prevDesc !== null) tag.setAttribute("content", prevDesc);
      else if (!existed) tag.remove();
    };
  }, [title, description]);
}
