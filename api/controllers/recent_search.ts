import { Response } from "express";
import { ISwaggerRequest } from "./request.swagger.d";
import * as db from "../../db/db";
import { RecentSearch } from "../../db/db.d";


export function getRecentSearch(req: ISwaggerRequest, res: Response) {
  const userID: number = req.swagger.params.id.value;

  db.getRecentSearch(userID)
    .then((recentSearch) => {
      res.json(recentSearch);
    })
    .catch((reason) => {
      res.json({ message: reason });
    });
}

export function addRecentSearch(req: ISwaggerRequest, res: Response) {
  let newSearch: RecentSearch = req.swagger.params.SearchResults.value;
  newSearch.user_id = req.swagger.params.id.value;

  db.addRecentSearch(newSearch)
    .then((searchID) => {
      res.json({ searchID: searchID });
    })
    .catch((reason) => {
      res.json({ message: reason });
    });
}
