import express from "express";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).send({ message: "Username is missing" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Error logging in: ${(error as Error).message}`);
  }
};
