import express from "express";
import { getUserByIdService } from "../service/user.service.js";
import { CustomErrorInterface } from "../utils/types.js";
import { responseGenerator } from "../utils/responseGenerator.js";

export const getUserDetails = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "No user id provided" });
    }
    const user = await getUserByIdService(id);
    return responseGenerator(res, 200, user);
  } catch (err) {
    const { code, message } = err as CustomErrorInterface;
    return responseGenerator(res, code, null, message);
  }
};
