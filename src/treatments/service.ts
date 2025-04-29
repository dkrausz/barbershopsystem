import { injectable } from "tsyringe";
import { ITreatmentService, TregisterTreatment, Ttreatment, TupdateTreatment } from "./interface";
import { prisma } from "../database/prisma";
import { treatmentSchema } from "./schema";

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

  updateTreament = async (id: string, payload: TupdateTreatment): Promise<Ttreatment> => {
    const updatedTreatment = await prisma.treatment.update({ where: { id }, data: payload });
    return treatmentSchema.parse(updatedTreatment);
  };

  deleteTreament = async (id: string): Promise<void> => {
    await prisma.treatment.delete({ where: { id } });
  };
}
