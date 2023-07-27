import { z } from "zod";
import {
  realEstateSchemaRequest,
  realEstateSchemaReturn,
  realEstateWithOutCategorySchemaReturn,
} from "../schemas/realEstate.schemas";

export type TRealEstateReturn = z.infer<typeof realEstateSchemaReturn>;

export type TRealEstateWithOutcategoryReturn = z.infer<
  typeof realEstateWithOutCategorySchemaReturn
>;

export type TRealEstateRequest = z.infer<typeof realEstateSchemaRequest>;
