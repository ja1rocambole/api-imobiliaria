import { z } from "zod";
import {
  realEstateSchedulesSchemaReturn,
  schedulesSchema,
} from "../schemas/schedules.schemas";

export type TSchedulesRequest = z.infer<typeof schedulesSchema>;
export type TRealEstateSchedulesReturn = z.infer<
  typeof realEstateSchedulesSchemaReturn
>;
