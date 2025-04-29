import { z } from "zod";
import { employeeRegisterSchema, employeeScheme, employeeUpdatSchema } from "./schema";

interface IEmployeeService {
  registerEmployee(payload: TregisterEmployee): Promise<Temployee>;
  getEmployees(): Promise<Temployee[]>;
  getEmployeeByName(name: string): Promise<null | Temployee[]>;
  updateEmployee(id: string, payload: TupdateEmployee): Promise<null | Temployee>;
  deleteEmployee(id: string): Promise<void>;
}

type Temployee = z.infer<typeof employeeScheme>;
type TregisterEmployee = z.infer<typeof employeeRegisterSchema>;
type TupdateEmployee = z.infer<typeof employeeUpdatSchema>;

export { IEmployeeService, Temployee, TregisterEmployee, TupdateEmployee };
