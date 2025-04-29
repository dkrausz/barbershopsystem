import { Router } from "express";
import { container } from "tsyringe";
import { TreatmentService } from "./service";
import { TreatmentController } from "./controller";
import { bodyMiddleware } from "../@shared/body.middleware";
import { treatmentRegisterSchema, treatmentUpdateSchema } from "./schema";

export const treatmentRoute = Router();

container.registerSingleton("TreatmentService", TreatmentService);
const treatmentController = container.resolve(TreatmentController);

treatmentRoute.post("/", bodyMiddleware.bodyIsValid(treatmentRegisterSchema), treatmentController.treatmentRegister);
treatmentRoute.get("/", treatmentController.getTreatments);
treatmentRoute.post("/:id", bodyMiddleware.bodyIsValid(treatmentUpdateSchema), treatmentController.updateTreatments);
treatmentRoute.delete("/:id", treatmentController.deleteTreatment);
