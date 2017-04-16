import { Response } from "express";
import { ISwaggerRequest } from "./request.swagger.d";
import * as db from "../../db/db";
import { LoginInfo } from '../../db/db.d';

export function login(req: ISwaggerRequest, res: Response) {

  const userInfo: LoginInfo = req.swagger.params.LoginInfo.value;

  db.login(userInfo)
    .then((userID) => {
      res.send({ userID: userID });
    })
    .catch((reason) => {
      if (reason === 'Forbidden') { // User doesn't exist
        res.status(403).json({ message: 'Incorrect login info' });
      } else { // Different error
        res.send(reason);
      }
    });
}
