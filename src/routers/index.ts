import express from "express";
import { login } from "../controller/auht.controller.js";

const router = express.Router();

router.post("/login", login);

export { router };
