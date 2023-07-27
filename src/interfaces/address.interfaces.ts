import { z } from "zod";
import { addressSchemaRequest } from "../schemas/addresses.schema";

export type TAddressReq = z.infer<typeof addressSchemaRequest>;
