import { Response } from 'express';
import { ISwaggerRequest } from './request.swagger.d';
import * as db from "../../db/db";
import * as ranker from '../../server/ranker';

export function getRestaurantsList(req: ISwaggerRequest, res: Response) {
  ranker.rank(req.swagger.params)
    .then(function (list) {
      res.json(list);
    })
    .catch(function (error) {
      res.json({ message: error });
    });
}
