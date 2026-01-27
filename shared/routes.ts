import { z } from "zod";
import { insertMessageSchema } from "./schema";

export const api = {
  // Although this is frontend-only, we define a contact form endpoint 
  // that could be implemented later. For now, frontend will mock this.
  contact: {
    submit: {
      method: "POST" as const,
      path: "/api/contact",
      input: insertMessageSchema,
      responses: {
        200: z.object({ success: z.boolean() }),
        400: z.object({ message: z.string() }),
      },
    },
  },
};
