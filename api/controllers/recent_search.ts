import { Request, Response } from "express";
import * as db from "../../db/db";


function getRecentSearch(req: Request, res: Response) {
  res.sendStatus(200);
}


function addRecentSearch(req: Request, res: Response) {
  res.sendStatus(200);
}

module.exports = {
  getRecentSearch,
  addRecentSearch
};
