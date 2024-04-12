import express from "express";
import { getAllBooksService } from "../service/books.service.js";
import {
  createOrder,
  deleteOrderService,
  getOrderByUserService,
} from "../service/order.service.js";
import { CustomErrorInterface, ServiceReturnInterface } from "../utils/types.js";
import { responseGenerator } from "../utils/responseGenerator.js";

export const createNewOrder = async (req: express.Request, res: express.Response) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res.status(400).send({ message: "Invalid request body" });
    }

    await createOrder(userId, bookId);

    return res.send({ message: "Success create order" });
  } catch (error) {
    const { code } = error as ServiceReturnInterface<null>;
    return res.status(code).send(error);
  }
};

export const cancelOrder = async (req: express.Request, res: express.Response) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res.status(400).send({ message: "Invalid request body" });
    }

    await deleteOrderService(userId, bookId);

    return res.send({ message: "Success cancel order" });
  } catch (error) {
    const { code } = error as ServiceReturnInterface<null>;
    return res.status(code).send(error);
  }
};

export const getAllOrderByUser = async (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.body;
    const allOrders = await getOrderByUserService(userId);
    return responseGenerator(res, 200, allOrders);
  } catch (err) {
    const { code, message } = err as CustomErrorInterface;
    return responseGenerator(res, code, null, message);
  }
};
