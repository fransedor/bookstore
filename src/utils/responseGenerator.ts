import { ServiceReturnInterface } from "./types.js";
import express from 'express';

export const responseGenerator = <T extends unknown>(res: express.Response, code: number, data: T, message?: string) => {
  const errorCodes = [400, 401, 403, 404, 500];

  const response: ServiceReturnInterface<T> = {
    code,
    error: errorCodes.includes(code),
    data,
    message,
  };
  return res.status(code).send(response)
};
