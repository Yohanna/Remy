import { Response } from "express";
import { ISwaggerRequest } from "./request.swagger.d";
import * as db from "../../db/db";

export function getUserAction(req: Request, res: Response) {
  res.sendStatus(200);
}

export function addUserAction(req: Request, res: Response) {
  res.sendStatus(200);
}
