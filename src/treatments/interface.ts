import { z } from "zod";
import { treatmentRegisterSchema, treatmentSchema, treatmentUpdateSchema } from "./schema";

interface ITreatmentService {
  registerTreatement(payload: TregisterTreatment): Promise<Ttreatment>;
  getTreatments(): Promise<Ttreatment[]>;
  getTreamentByName(name: string): Promise<Ttreatment[]>;
  updateTreament(id: string, payload: TupdateTreatment): Promise<Ttreatment>;
  getListOfTreatmenteByIds(ids: string[]): Promise<Ttreatment[]>;
  deleteTreament(id: string): Promise<void>;
}

type Ttreatment = z.infer<typeof treatmentSchema>;
type TregisterTreatment = z.infer<typeof treatmentRegisterSchema>;
type TupdateTreatment = z.infer<typeof treatmentUpdateSchema>;

export { ITreatmentService, Ttreatment, TregisterTreatment, TupdateTreatment };
