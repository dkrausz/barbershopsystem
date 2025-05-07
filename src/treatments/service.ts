import { injectable } from "tsyringe";
import { ITreatmentService, TregisterTreatment, Ttreatment, TupdateTreatment } from "./interface";
import { prisma } from "../database/prisma";
import { treatmentSchema } from "./schema";
import { AppError } from "../@shared/errors";

@injectable()
export class TreatmentService implements ITreatmentService {
  registerTreatement = async (payload: TregisterTreatment): Promise<Ttreatment> => {
    const newTreatment = await prisma.treatment.create({ data: payload });
    return treatmentSchema.parse(newTreatment);
  };

  getTreatments = async (): Promise<Ttreatment[]> => {
    const treatments = await prisma.treatment.findMany({});

    return treatmentSchema.array().parse(treatments);
  };

  getTreamentByName = async (name: string): Promise<Ttreatment[]> => {
    const treatment = await prisma.treatment.findMany({ where: { name } });
    return treatmentSchema.array().parse(treatment);
  };

  getListOfTreatmenteByIds = async (ids: string[]): Promise<Ttreatment[]> => {
    const treatments = await Promise.all(
      ids.map((id) => {
        return prisma.treatment.findFirst({ where: { id } });
      })
    );

    const missing = treatments.some((treatment) => treatment === null);
    if (missing) {
      throw new AppError(404, "Um ou mais tratamentos não foram encontrados.");
    }

    return treatmentSchema.array().parse(treatments);
  };

  updateTreament = async (id: string, payload: TupdateTreatment): Promise<Ttreatment> => {
    const updatedTreatment = await prisma.treatment.update({ where: { id }, data: payload });
    return treatmentSchema.parse(updatedTreatment);
  };

  deleteTreament = async (id: string): Promise<void> => {
    await prisma.treatment.delete({ where: { id } });
  };
}
