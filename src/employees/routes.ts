import { Router } from "express";
import { container } from "tsyringe";
import { EmployeeService } from "./services";
import { EmployeeController } from "./controller";
import { bodyMiddleware } from "../@shared/body.middleware";
import { employeeRegisterSchema, employeeScheme } from "./schema";
import { updateClientSchema } from "../clients/schema";

export const employeeRoute = Router();

container.registerSingleton("EmployeeService", EmployeeService);
const employeeControler = container.resolve(EmployeeController);

employeeRoute.post("/", bodyMiddleware.bodyIsValid(employeeRegisterSchema), employeeControler.employeeRegister);
employeeRoute.get("/", employeeControler.getEmployees);
employeeRoute.post("/:id", bodyMiddleware.bodyIsValid(updateClientSchema), employeeControler.updateEmployee);
employeeRoute.delete("/:id", employeeControler.deleteEmployee);
