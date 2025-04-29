import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import { clientRoute } from "./clients/routes";
import { HandleErrors } from "./@shared/HandleErrors";
import { employeeRoute } from "./employees/routes";

export const app = express();

app.use(json());
app.use("/clients", clientRoute);
app.use("/employees", employeeRoute);
app.use(HandleErrors.execute);
