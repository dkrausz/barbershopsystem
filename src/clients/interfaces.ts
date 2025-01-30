import z from "zod";

import { addressSchema } from "../address/schema";
import { clientRegisterSchema, clientSchema } from "./schema";

export type Tclient = z.infer<typeof clientSchema>;
export type TregisterClient = z.infer<typeof clientRegisterSchema>;
