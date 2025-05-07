import { inject, injectable } from "tsyringe";
import { IEmployeeService } from "./interfaces";
import { Request, Response } from "express";

@injectable()
export class EmployeeController {
  constructor(@inject("EmployeeService") private employeeService: IEmployeeService) {}

  employeeRegister = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.employeeService.registerEmployee(req.body);
    return res.status(201).json(response);
  };

  getEmployees = async (req: Request, res: Response): Promise<Response> => {
    const { name } = req.query;
    let response: any;
    if (name) {
      response = await this.employeeService.getEmployeeByName(name as string);
    } else {
      response = await this.employeeService.getEmployees();
    }

    return res.status(200).json(response);
  };

  updateEmployee = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const response = await this.employeeService.updateEmployee(id, req.body);
    return res.status(200).json(response);
  };

  deleteEmployee = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const response = await this.employeeService.deleteEmployee(id);
    return res.status(204).json("");
  };
}
