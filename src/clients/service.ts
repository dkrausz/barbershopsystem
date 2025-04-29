import { inject, injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { IClientService, Tclient, TregisterClient, TupdateClient } from "./interfaces";
import { clientSchema, returnClientSchema } from "./schema";
import { AppError } from "../@shared/errors";
import { AddressService } from "../address/service";

@injectable()
export class ClientService implements IClientService {
  constructor(@inject(AddressService) private addressService: AddressService) {}

  registerClient = async (payload: TregisterClient): Promise<Tclient> => {
    let newPayload;
    let registeredClient;
    const { address, ...rest } = payload;
    if (payload.address) {
      const registerdAddress = await this.addressService.registerAddress(payload.address);
      newPayload = { ...rest, addressId: registerdAddress.id };
      registeredClient = await prisma.client.create({ data: newPayload, include: { address: true } });
    } else {
      newPayload = { ...rest };
      registeredClient = await prisma.client.create({
        data: newPayload,
      });
    }

    return clientSchema.parse(registeredClient);
  };

  getClients = async (): Promise<Array<Tclient>> => {
    const clientList = await prisma.client.findMany({ include: { address: true } });
    return returnClientSchema.array().parse(clientList);
  };

  getClientById = async (id: string): Promise<Tclient | null> => {
    const client = await prisma.client.findFirst({ where: { id }, include: { address: true } });
    if (!client) {
      throw new AppError(404, "Cliente não encontrado");
    }
    return returnClientSchema.parse(client);
  };

  getClientByName = async (name: string): Promise<Array<Tclient> | null> => {
    const client = await prisma.client.findMany({ where: { name }, include: { address: true } });
    return returnClientSchema.array().parse(client);
  };

  getClientByPhone = async (phone: string): Promise<Tclient | null> => {
    const client = await prisma.client.findFirst({ where: { phone }, include: { address: true } });
    if (!client) {
      throw new AppError(404, "Cliente não encontrado");
    }

    return returnClientSchema.parse(client);
  };

  updateClient = async (id: string, payload: TupdateClient): Promise<Tclient | null> => {
    const updatedClient = await prisma.client.update({ where: { id }, data: payload });
    return returnClientSchema.parse(updatedClient);
  };

  deleteClient = async (id: string): Promise<void> => {
    await prisma.client.delete({ where: { id } });
    return;
  };
}
