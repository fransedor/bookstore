import express from "express";
import { getAllBooksService } from "../service/books.service.js";
import { createOrder, deleteOrderService } from "../service/order.service.js";
import { ServiceReturnInterface } from "../utils/types.js";

export const createNewOrder = async (req: express.Request, res: express.Response) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res.status(400).send({ message: "Invalid request body" });
    }

    await createOrder(userId, bookId);

    return res.send({ message: "Success create order" });
  } catch (error) {
		const { code } = error as ServiceReturnInterface<null>
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
		const { code } = error as ServiceReturnInterface<null>
    return res.status(code).send(error);
  }
};
