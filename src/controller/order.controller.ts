import express from "express";
import { getAllBooksService } from "../service/books.service.js";
import { createOrder } from "../service/order.service.js";

export const createNewOrder = async (req: express.Request, res: express.Response) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res.status(400).send({ message: "Invalid request body" });
    }

    await createOrder(userId, bookId);

    return res.send({ message: "Success create order" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Error get all books: ${(error as Error).message}`);
  }
};
