export interface TrustedByLogo {
  /** Organisation name — also the img alt text, and the wordmark fallback. */
  name: string;
  /** Path under /public, e.g. "/logos/iisc.svg". Omit to render a wordmark. */
  logo?: string;
  href?: string;
  /** Placeholders render dimmed and are announced as upcoming. */
  placeholder?: boolean;
}

/* --------------------------------------------------------------------------
   Add a logo: drop the file in client/public/logos/ and append an entry.
   Nothing else to change — the marquee duplicates and scrolls the list itself.

   Rendering rules:
   - With `logo`: the image renders greyscale, full colour on hover.
   - Without `logo`: the name renders as a wordmark, so an organisation can be
     listed before its asset arrives.
   - The strip hides itself entirely when this array is empty.

   TODO (Aswin): drop real IISc + NVIDIA Inception marks into public/logos/ and
   set `logo` on those two rows. The trailing placeholders are intentional —
   no partner or customer has been invented here.
   -------------------------------------------------------------------------- */

export const TRUSTED_BY: TrustedByLogo[] = [
  { name: "IISc" },
  { name: "NVIDIA Inception" },
  { name: "Partner logo", placeholder: true },
  { name: "Customer logo", placeholder: true },
  { name: "Advisor logo", placeholder: true },
];

export const TRUSTED_BY_LABEL = "Supported and backed by";
