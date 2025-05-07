import { Router } from "express";
import { container } from "tsyringe";
import { ClientService } from "./service";
import { ClientController } from "./controller";
import { bodyMiddleware } from "../@shared/body.middleware";
import { clientRegisterSchema, updateClientSchema } from "./schema";
import { OrderService } from "../order/service";
import { OrderController } from "../order/controller";
import { registerOrderSchema } from "../order/schema";

export const clientRoute = Router();

container.registerSingleton("ClientService", ClientService);
const clientController = container.resolve(ClientController);

container.registerSingleton("OrderService", OrderService);
const orderController = container.resolve(OrderController);

clientRoute.post("/", bodyMiddleware.bodyIsValid(clientRegisterSchema), clientController.registerClient);
clientRoute.get("/", clientController.getClients);
clientRoute.get("/:id", clientController.getClientById);
clientRoute.post("/:id", bodyMiddleware.bodyIsValid(updateClientSchema), clientController.updateClient);
clientRoute.delete("/:id", clientController.deleteClient);
clientRoute.post("/:id/orders", bodyMiddleware.bodyIsValid(registerOrderSchema), orderController.registerOrder);
