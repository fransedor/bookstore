import express from "express";
import { login } from "../controller/auth.controller.js";
import { getListOfBooks } from "../controller/books.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/books", getListOfBooks);

export { router };
