import { injectable } from "tsyringe";
import { IAddress, TAddress, TRegisterAddress } from "./interface";
import { prisma } from "../database/prisma";
import { addressSchema } from "./schema";

@injectable()
export class AddressService implements IAddress {
  registerAddress = async (payload: TRegisterAddress): Promise<TAddress> => {
    const newAddress = await prisma.address.create({ data: payload });
    return addressSchema.parse(newAddress);
  };
}
