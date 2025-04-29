import { inject, injectable } from "tsyringe";
import { ITreatmentService } from "./interface";
import { Request, Response } from "express";

@injectable()
export class TreatmentController {
  constructor(@inject("TreatmentService") private treatmentService: ITreatmentService) {}

  treatmentRegister = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.treatmentService.registerTreatement(req.body);
    return res.status(201).json(response);
  };

  getTreatments = async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.query;
    let response;
    if (name) {
      response = await this.treatmentService.getTreamentByName(name as string);
    } else {
      response = await this.treatmentService.getTreatments();
    }

    return res.status(200).json(response);
  };

  updateTreatments = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const response = await this.treatmentService.updateTreament(id, req.body);
    return res.status(200).json(response);
  };

  deleteTreatment = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.treatmentService.deleteTreament(id);
    return res.status(204);
  };
}
