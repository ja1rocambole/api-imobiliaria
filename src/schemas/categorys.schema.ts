import { z } from "zod";

export const categorySchemaReturn = z.object({
  id: z.number(),
  name: z.string().max(45),
});

export const categorySchemaRequest = categorySchemaReturn.omit({ id: true });

export const categoryArraySchemaReturn = categorySchemaReturn.array();
