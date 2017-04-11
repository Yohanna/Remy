import { Response } from "express";
import { ISwaggerRequest } from "./request.swagger.d";
import * as db from "../../db/db";
import { UserAction } from "../../db/db.d";

export function getUserAction(req: ISwaggerRequest, res: Response) {
  const userID: number = req.swagger.params.id.value;

  db.getUserAction(userID)
    .then((action) => {
      res.json(action);
    })
    .catch((reason) => {
      res.json({ message: reason });
    });
}

export function addUserAction(req: ISwaggerRequest, res: Response) {

  let newAction: UserAction; //= req.swagger. // TODO
  newAction.user_id = req.swagger.params.id.value;

  db.addUserAction(newAction)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((reason) => {
      res.json({ message: reason });
    });
}
