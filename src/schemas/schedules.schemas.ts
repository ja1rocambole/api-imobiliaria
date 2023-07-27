import { z } from "zod";
import { userSchema } from "./users.schemas";

const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
const hourRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

export const schedulesSchema = z.object({
  date: z.string().regex(dateRegex),
  hour: z.string().regex(hourRegex),
  realEstateId: z.number(),
});

const schedulesForrealEstateSchedulesSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  user: userSchema,
});

export const realEstateSchedulesSchemaReturn = z.object({
  id: z.number(),
  value: z.number(),
  size: z.number(),
  address: z.object({
    id: z.number(),
    street: z.string(),
    zipCode: z.string(),
    number: z.string().nullish(),
    city: z.string(),
    state: z.string(),
  }),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  schedules: schedulesForrealEstateSchedulesSchema.array(),
  sold: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
