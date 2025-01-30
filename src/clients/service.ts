import { prisma } from "../database/prisma";
import { Tclient, TregisterClient } from "./interfaces";
import { clientSchema } from "./schema";

export class ClientService {
  registerClient = async (payload: TregisterClient): Promise<Tclient> => {
    const registeredClient = await prisma.client.create({
      data: payload,
    });

    return clientSchema.parse(registeredClient);
  };

  getClients = async (): Promise<Array<Tclient>> => {
    const clientList = await prisma.client.findMany({ include: { address: true } });
    return clientSchema.array().parse(clientList);
  };
}
