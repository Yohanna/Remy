import { Response } from "express";
import * as db from '../../db/db';


export function getUserMetrics(req, res) {
  const userID = req.swagger.params.id.value;

  db.getUserMetrics(userID)
    .then((userMetrics) => {
      res.json(userMetrics);
    })
    .catch((reason) => {
      res.status(404).json({ message: reason });
    });
}

export function addUserMetrics(req, res: Response) {
  const newUserMetrics = req.swagger.params.metrics.value;
  const userID = req.swagger.params.id.value;

  db.addUserMetrics(userID, newUserMetrics)
    .then((status) => {
      res.status(201).json(status);
    })
    .catch((reason) => {
      res.json({ message: reason });
    });
}

export function updateUserMetrics(req, res) {
  const newMetrics = req.swagger.params.metrics.value;
  const userID = req.swagger.params.id.value;

  db.updateUserMetrics(userID, newMetrics)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((reason) => {
      res.json({ message: reason });
    })
}
