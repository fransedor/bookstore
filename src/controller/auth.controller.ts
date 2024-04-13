import express from "express";
import { loginByUsername, registerUser } from "../service/auth.service.js";
import { CustomErrorInterface } from "../utils/types.js";
import { responseGenerator } from "../utils/responseGenerator.js";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ message: "Username or password is missing" });
    }

    const user = await loginByUsername(username, password);

    return responseGenerator(res, 200, user, "success");
  } catch (error) {
    const { code, message } = error as CustomErrorInterface;
    return responseGenerator(res, code, null, message);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ message: "Username or password is missing" });
    }

    await registerUser(username, password);

    return responseGenerator(res, 200, null, "success");
  } catch (error) {
    const { code, message } = error as CustomErrorInterface;
    return responseGenerator(res, code, null, message);
  }
};
