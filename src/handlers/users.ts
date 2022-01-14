import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import { verifyAuthToken } from "../middlewars/auth";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const user = await store.show(_req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  let token: string | null = null;
  try {
    const authUser = await store.authenticate(user);
    if (authUser) {
      token = jwt.sign({ user: authUser }, process.env.TOKEN_SECRET as string);
    }

    res.json(token);
  } catch (error) {
    res.send("Error" + error);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err as string);
  }
};
const seed = async (req: Request, res: Response) => {
  const user: User = {
    firstName: "super",
    lastName: "admin",
    password: "super123",
  };
  try {
    const newUser = await store.create(user);
    let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err as string);
  }
};

const users_routes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.get("/auth", authenticate);
  app.get("/seed", seed);
};

export default users_routes;
