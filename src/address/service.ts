import { injectable } from "tsyringe";
import { IAddress, TAddress, TRegisterAddress, TUpdateAddress } from "./interface";
import { prisma } from "../database/prisma";
import { addressSchema } from "./schema";

@injectable()
export class AddressService implements IAddress {
  registerAddress = async (payload: TRegisterAddress): Promise<TAddress> => {
    const newAddress = await prisma.address.create({ data: payload });
    return addressSchema.parse(newAddress);
  };

  updateAddress = async (id: string, payload: TUpdateAddress): Promise<TAddress> => {
    const updatedAddress = await prisma.address.update({ where: { id }, data: payload });
    return addressSchema.parse(updatedAddress);
  };
}
