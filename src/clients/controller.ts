import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { IClientService } from "./interfaces";

@injectable()
export class ClientController {
  constructor(@inject("ClientService") private clientService: IClientService) {}

  registerClient = async (req: Request, res: Response): Promise<Response> => {
    const client = await this.clientService.registerClient(req.body);
    return res.status(201).json(client);
  };

  getClients = async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.query;
    const { phone } = req.query;
    let client;
    if (name) {
      client = await this.clientService.getClientByName(name as string);
    } else if (phone) {
      client = await this.clientService.getClientByPhone(phone as string);
    } else {
      client = await this.clientService.getClients();
    }
    return res.status(200).json(client);
  };

  getClientById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const client = await this.clientService.getClientById(id as string);
    return res.status(200).json(client);
  };

  updateClient = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const client = await this.clientService.updateClient(id, req.body);
    return res.status(200).json(client);
  };

  deleteClient = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.clientService.deleteClient(id);
    return res.status(204).json("");
  };
}
