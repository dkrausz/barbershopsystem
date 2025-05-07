import { Router } from "express";
import { container } from "tsyringe";
import { OrderController } from "./controller";
import { OrderService } from "./service";

export const orderRoute = Router();

container.registerSingleton("OrderServive", OrderService);
const orderController = container.resolve(OrderController);

orderRoute.get("/", orderController.getAllOrders);
orderRoute.get("/:orderId", orderController.getOrderById);
