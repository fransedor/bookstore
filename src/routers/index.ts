import express from "express";
import { login } from "../controller/auth.controller.js";
import { getListOfBooks } from "../controller/books.controller.js";
import { cancelOrder, createNewOrder } from "../controller/order.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/books", getListOfBooks);
router.post("/order", createNewOrder);
router.delete("/order", cancelOrder);

export { router };
