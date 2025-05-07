import { inject, injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { orderSchema, orderWithTreatmentsAndClientSchema, orderWithTreatmentsSchema, returnOrderSchema } from "./schema";
import { TreturnOrderWithTreatments, Torder, TregisterOrder, TreturnOrderWithTreatmentsAndClient } from "./interfaces";
import { TreatmentService } from "../treatments/service";
import { AppError } from "../@shared/errors";

@injectable()
export class OrderService {
  constructor(@inject(TreatmentService) private treatmentService: TreatmentService) {}
  registerOrder = async (clientId: string, payload: TregisterOrder): Promise<TreturnOrderWithTreatments> => {
    const treatmentList = await this.treatmentService.getListOfTreatmenteByIds(payload.treatmentIds);
    const totalAmount = treatmentList.reduce((acc, currentValue) => acc + currentValue.price, 0);
    const treatmentIdList = treatmentList.map((treatment) => ({ id: treatment.id }));

    const newOrder = await prisma.order.create({
      data: {
        clientId: clientId,
        amount: totalAmount,
        date: payload.date,
        treatments: { connect: treatmentIdList },
      },
      include: { treatments: true },
    });

    return orderWithTreatmentsSchema.parse(newOrder);
  };

  getAllOrders = async (): Promise<TreturnOrderWithTreatmentsAndClient[]> => {
    const orders = await prisma.order.findMany({ include: { treatments: true, client: true } });

    return orderWithTreatmentsAndClientSchema.array().parse(orders);
  };

  getOrderById = async (id: string): Promise<TreturnOrderWithTreatmentsAndClient> => {
    const order = await prisma.order.findFirst({ where: { id }, include: { treatments: true, client: true } });
    if (!order) {
      throw new AppError(404, "Ordem não encontrada");
    }
    return orderWithTreatmentsAndClientSchema.parse(order);
  };

  getOrdersByDate = async (date: Date): Promise<TreturnOrderWithTreatmentsAndClient[]> => {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const orders = await prisma.order.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        treatments: true,
        client: true,
      },
    });

    return orderWithTreatmentsAndClientSchema.array().parse(orders);
  };
}
