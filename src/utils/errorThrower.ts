export const errorThrower = (code: number, message: string) => {
  throw {
    code,
    message,
  };
};
