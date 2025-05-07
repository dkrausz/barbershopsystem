import "reflect-metadata";
import "express-async-errors";
import helmet from "helmet";
import cors from "cors";
import express, { json } from "express";
import { clientRoute } from "./clients/routes";
import { HandleErrors } from "./@shared/HandleErrors";
import { employeeRoute } from "./employees/routes";
import { treatmentRoute } from "./treatments/routes";
import { orderRoute } from "./order/routes";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use("/clients", clientRoute);
app.use("/employees", employeeRoute);
app.use("/treatments", treatmentRoute);
app.use("/order", orderRoute);
app.use(HandleErrors.execute);
