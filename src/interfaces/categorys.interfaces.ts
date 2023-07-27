import { z } from "zod";
import {
  categorySchemaRequest,
  categorySchemaReturn,
} from "../schemas/categorys.schema";

export type TCategoryRequest = z.infer<typeof categorySchemaRequest>;
export type TCategoryReturn = z.infer<typeof categorySchemaReturn>;
