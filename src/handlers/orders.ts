import express, { Request, Response } from "express";
import { verifyAuthToken } from "../middlewars/auth";
import { Order, OrderStore } from "../models/order";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const authorizationHeader = _req.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.split(" ")[1] : "";
    const decodedToken = jwt.decode(token) as { user: { id: string } };
    const userId = decodedToken?.user.id;

    const orders = await store.index(parseInt(userId));
    res.json(orders);
  } catch (error) {}
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: parseInt(req.body.user_id),
    status: req.body.status,
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err ? err : "");
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orders_routes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.post("/orders", verifyAuthToken, create);
  app.post("/orders/:id/products", addProduct);
};

export default orders_routes;
