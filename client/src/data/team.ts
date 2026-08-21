export interface TeamMember {
  name: string;
  title: string;
  /** One line. Keep it short. */
  bio?: string;
  photo?: string;
  linkedin?: string;
}

export interface TeamGroup {
  id: string;
  title: string;
  members: TeamMember[];
}

/* --------------------------------------------------------------------------
   TODO (Aswin): confirm the flagged items before launch.
   - "Aswin" vs "Aswin Sunil" (old site used the full name — kept below).
   - "Jilsha K S" vs "Jilsha Saji" (old site used Jilsha Saji).
   - "Dakshayani B P" vs "BP Dakshayani" (old site used BP Dakshayani).
   - Dakshayani's title changed: "Chief Scientific Advisor" → "Flight and
     Mission Planning". Using the new one.
   - Photos missing for Akhila, S Arulmozhi, Pushpak Jagtap → initials avatar.
   - LinkedIn URLs missing for the three new advisors.
   -------------------------------------------------------------------------- */

export const TEAM_GROUPS: TeamGroup[] = [
  {
    id: "leadership",
    title: "Leadership team",
    members: [
      {
        name: "Aswin Sunil",
        title: "Founder and CEO",
        photo: "/team/aswin.jpg",
        linkedin: "https://www.linkedin.com/in/aswin-sunil-1681341a1/",
      },
      {
        name: "Aaron Steephen",
        title: "Co-founder and COO",
        photo: "/team/aaron.jpg",
        linkedin: "https://www.linkedin.com/in/aaron-steephen-934297201/",
      },
    ],
  },
  {
    id: "founding-engineers",
    title: "Founding engineers",
    members: [
      {
        name: "Jilsha K S",
        title: "Space systems engineer",
        photo: "/team/jilsha.jpg",
        linkedin: "https://www.linkedin.com/in/jilsha-saji-79809b291/",
      },
      {
        name: "Salinimol T A",
        title: "Mission planning engineer",
        photo: "/team/salinimol.jpg",
        linkedin: "https://www.linkedin.com/in/salinimol-t-a-1a9990290/",
      },
      {
        name: "Akhila",
        title: "ML scientist",
        // TODO: photo + LinkedIn
      },
    ],
  },
  {
    id: "advisory-board",
    title: "Advisory board",
    members: [
      {
        name: "Dakshayani B P",
        title: "Flight and mission planning",
        photo: "/team/dakshayani.jpg",
      },
      {
        name: "S Arulmozhi",
        title: "Operations and quality",
        // TODO: photo + LinkedIn
      },
      {
        name: "Pushpak Jagtap",
        title: "Autonomy and control",
        // TODO: photo + LinkedIn
      },
      {
        name: "Rahul Dandamudi",
        title: "Board strategic advisor",
        photo: "/team/rahul.jpg",
      },
    ],
  },
];
