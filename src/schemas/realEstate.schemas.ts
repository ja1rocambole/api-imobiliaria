import { z } from "zod";
import { addressSchemaRequest, addressSchemaReturn } from "./addresses.schema";
import { categorySchemaReturn } from "./categorys.schema";

export const realEstateSchema = z.object({
  id: z.number(),
  value: z
    .string()
    .regex(/^\d{1,10}(\.\d{1,2})?$/)
    .transform((val) => Number(val))
    .default("0")
    .or(z.number().min(0).max(9999999999.99).default(0)),
  size: z.number().int().positive(),
  address: addressSchemaRequest,
  categoryId: z.number().int(),
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const realEstateSchemaReturn = z.object({
  id: z.number(),
  value: z.number(),
  size: z.number(),
  address: addressSchemaReturn,
  category: categorySchemaReturn,
  sold: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const realEstateWithOutCategorySchemaReturn =
  realEstateSchemaReturn.omit({
    category: true,
  });

export const realEstateWithOutCategorySchemaArrayReturn =
  realEstateWithOutCategorySchemaReturn.array();

export const realEstateSchemaRequest = realEstateSchema.omit({
  id: true,
  sold: true,
  createdAt: true,
  updatedAt: true,
});
