import { inject, injectable } from "tsyringe";
import { IEmployeeService, Temployee, TregisterEmployee, TupdateEmployee } from "./interfaces";
import { prisma } from "../database/prisma";
import { employeeScheme, employeeUpdatSchema, returnEmployeeSchema } from "./schema";
import { AppError } from "../@shared/errors";
import { AddressService } from "../address/service";

@injectable()
export class EmployeeService implements IEmployeeService {
  constructor(@inject(AddressService) private addressService: AddressService) {}

  registerEmployee = async (payload: TregisterEmployee): Promise<Temployee> => {
    let newEmployee;
    const { address, ...rest } = payload;
    if (payload.address) {
      const newAddress = await this.addressService.registerAddress(payload.address);
      const newPayload = { ...rest, addressId: newAddress.id };
      newEmployee = await prisma.employee.create({ data: newPayload, include: { address: true } });
    } else {
      const newPayload = { ...rest };
      newEmployee = await prisma.employee.create({ data: newPayload });
    }

    return returnEmployeeSchema.parse(newEmployee);
  };

  getEmployees = async (): Promise<Temployee[]> => {
    const employees = await prisma.employee.findMany({ include: { address: true } });
    return returnEmployeeSchema.array().parse(employees);
  };

  getEmployeeByName = async (name: string): Promise<null | Temployee[]> => {
    const employees = await prisma.employee.findMany({ where: { name } });
    if (!employees) {
      throw new AppError(404, "Funcionario não encontrado");
    }
    return returnEmployeeSchema.array().parse(employees);
  };

  updateEmployee = async (id: string, payload: TupdateEmployee): Promise<null | Temployee> => {
    const updatedEmployee = await prisma.employee.update({ where: { id }, data: payload });
    return returnEmployeeSchema.parse(updatedEmployee);
  };

  deleteEmployee = async (id: string): Promise<void> => {
    await prisma.employee.delete({ where: { id } });
    return;
  };
}
