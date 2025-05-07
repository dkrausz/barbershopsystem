import { z } from "zod";
import { addressRegisterSchema, addressSchema, addressUpdateSchema } from "./schema";

interface IAddress {
  registerAddress(payload: TRegisterAddress): Promise<TAddress>;
  updateAddress(id: string, payload: TUpdateAddress): Promise<TAddress>;
}

type TAddress = z.infer<typeof addressSchema>;
type TRegisterAddress = z.infer<typeof addressRegisterSchema>;
type TUpdateAddress = z.infer<typeof addressUpdateSchema>;

export { IAddress, TAddress, TRegisterAddress, TUpdateAddress };
