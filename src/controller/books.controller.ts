import express from "express";
import { loginByUsername } from "../service/auth.service.js";
import { getAllBooksService } from "../service/books.service.js";

export const getListOfBooks = async (req: express.Request, res: express.Response) => {
  try {
    const { page = 1, show = 20 } = req.query;
		console.log(req.params);

    const user = await getAllBooksService(Number(page), Number(show));

    return res.send({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Error get all books: ${(error as Error).message}`);
  }
};
