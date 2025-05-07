import { NextFunction, Request, Response } from "express";
import { AppError } from "./errors";
import { ZodError } from "zod";

export class HandleErrors {
  static execute(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log("error", err);
    console.log(err instanceof ZodError);

    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ZodError) {
      return res.status(400).json({ errors: err.flatten().fieldErrors });
    }

    return res.status(500).json({ error: "Internal server error." });
  }
}
