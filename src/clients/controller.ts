import { Request, response, Response } from "express";
import { Tclient } from "./interfaces";
import { ClientService } from "./service";
import { inject } from "tsyringe";

export class ClientController {
  constructor(@inject("ClientServices") private clientServices: ClientService) {}

  registerClient = async (req: Request, res: Response): Promise<Response<Tclient>> => {
    const response = await this.clientServices.registerClient(req.body);
    return res.status(201).json(response);
  };

  getClients = async (req: Request, res: Response): Promise<Response<Array<Tclient>>> => {
    const response = await this.clientServices.getClients();
    return res.status(200).json(response);
  };

  getClientByName = async (req: Request, res: Response): Promise<Response<Tclient | null>> => {
    const response = await this.clientServices.getClientByName(name);
    return res.status(200).json(response);
  };
}
