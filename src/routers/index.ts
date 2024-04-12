import express from "express";
import { login } from "../controller/auth.controller.js";
import { getListOfBooks } from "../controller/books.controller.js";
import { cancelOrder, createNewOrder, getAllOrderByUser } from "../controller/order.controller.js";
import { getUserDetails } from "../controller/users.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/books", getListOfBooks);
router.post("/order", createNewOrder);
router.delete("/order", cancelOrder);
router.get("/order", getAllOrderByUser);
router.get("/users/:id", getUserDetails);

export { router };
