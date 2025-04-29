import { injectable } from "tsyringe";
import { IEmployeeService, Temployee, TregisterEmployee, TupdateEmployee } from "./interfaces";
import { prisma } from "../database/prisma";
import { employeeScheme, employeeUpdatSchema } from "./schema";
import { AppError } from "../@shared/errors";

@injectable()
export class EmployeeService implements IEmployeeService {
  registerEmployee = async (payload: TregisterEmployee): Promise<Temployee> => {
    const newEmployee = await prisma.employee.create({ data: payload });
    return employeeScheme.parse(newEmployee);
  };

  getEmployees = async (): Promise<Temployee[]> => {
    const employees = await prisma.employee.findMany({ include: { address: true } });
    return employeeScheme.array().parse(employees);
  };

  getEmployeeByName = async (name: string): Promise<null | Temployee[]> => {
    const employees = await prisma.employee.findMany({ where: { name } });
    if (!employees) {
      throw new AppError(404, "Funcionario não encontrado");
    }
    return employeeScheme.array().parse(employees);
  };

  updateEmployee = async (id: string, payload: TupdateEmployee): Promise<null | Temployee> => {
    const updatedEmployee = await prisma.employee.update({ where: { id }, data: payload });
    return employeeScheme.parse(updatedEmployee);
  };

  deleteEmployee = async (id: string): Promise<void> => {
    await prisma.employee.delete({ where: { id } });
    return;
  };
}
