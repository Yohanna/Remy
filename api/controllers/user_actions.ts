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

  let newAction: UserAction = req.swagger.params.UserAction.value;
  newAction.user_id = req.swagger.params.id.value;

  db.addUserAction(newAction)
    .then((status) => {
      res.status(201).json(status);
    })
    .catch((reason) => {
      res.json({ message: reason });
    });
}

export function deleteUserAction(req: ISwaggerRequest, res: Response) {
  const userID: number = req.swagger.params.id.value;
  const restaurantID: string = req.swagger.params.restaurant_id.value;
  const timestamp: string = req.swagger.params.timestamp.value;

  db.deleteUserAction(userID, restaurantID, timestamp)
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((reason) => {
      res.json({ message: reason });
    });

}
