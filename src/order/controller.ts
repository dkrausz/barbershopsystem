import { inject, injectable } from "tsyringe";
import { OrderService } from "./service";
import { Request, Response } from "express";

@injectable()
export class OrderController {
  constructor(@inject("OrderService") private orderService: OrderService) {}

  registerOrder = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const newOrder = await this.orderService.registerOrder(id, req.body);
    return res.status(201).json(newOrder);
  };

  getAllOrders = async (req: Request, res: Response): Promise<Response> => {
    const { date } = req.query;
    let orders;
    if (date) {
      orders = await this.orderService.getOrdersByDate(new Date(date as string));
    } else {
      orders = await this.orderService.getAllOrders();
    }

    return res.status(200).json(orders);
  };

  getOrderById = async (req: Request, res: Response): Promise<Response> => {
    const { orderId } = req.params;
    const order = await this.orderService.getOrderById(orderId);
    return res.status(200).json(order);
  };
}
