import { Response } from "express";
import { ISwaggerRequest } from "./request.swagger.d";
import * as db from "../../db/db";

export function getUser(req, res) {
  const userID = req.swagger.params.id.value;

  db.getUser(userID)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (reason) {
      res.status(404).json({ message: reason });
    });
}

export function getAllUsers(req, res) {
  db.getAllUsers()
    .then(function (result) {
      res.send(result);
    })
    .catch(function (reason) {
      res.status(500).json({ message: reason });
    });
}

export function addUser(req, res) {
  const newUser = req.swagger.params.user.value;

  db.addUser(newUser)
    .then((newUserID) => {
      res.status(201).json({ userID: newUserID });
    })
    .catch((reason) => {
      res.send(reason);
    });
}

export function updateUser(req, res) {
  const userID = req.swagger.params.id.value;
  const newUser = req.swagger.params.user.value;

  db.updateUser(userID, newUser)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((reason) => {
      res.send(reason);
    });
}

export function deleteUser(req, res) {
  const userID = req.swagger.params.id.value;

  db.deleteUser(userID)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((reason) => {
      res.send(reason);
    });
}
