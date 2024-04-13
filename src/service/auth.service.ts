import { createNewUser } from "../repository/user/createNewUser.js";
import { getUserByUsername } from "../repository/user/getUserByUsername.js";
import { errorThrower } from "../utils/errorThrower.js";
import bcrypt from "bcrypt";
import { CustomErrorInterface } from "../utils/types.js";
import jwt from "jsonwebtoken";
import { UserInterface } from "../entity/models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "";
const ACCESS_TOKEN_EXPIRE_IN_SECONDS = process.env.ACCESS_TOKEN_EXPIRE_IN_SECONDS || "3600";

export const loginByUsername = async (username: string, password: string) => {
  try {
    const users = await getUserByUsername(username);
    if (!users.length) {
      throw errorThrower(404, "User not found");
    }
    const existingUser = users[0];
    const userPassword = existingUser.password;
    if (bcrypt.compareSync(password, userPassword)) {

      const issuedJwtTimeInSeconds = Math.floor(Date.now() / 1000);
      const jwtExpiredTimeInSeconds =
        issuedJwtTimeInSeconds + Number(ACCESS_TOKEN_EXPIRE_IN_SECONDS);

      const userRole = existingUser.role as UserInterface["role"];
      const token = jwt.sign(
        { admin: userRole === "admin", exp: jwtExpiredTimeInSeconds },
        JWT_SECRET
      );
      return {
        accessToken: token,
      };
    } else {
      throw errorThrower(404, "User not found");
    }
  } catch (err) {
    const { code, message } = err as CustomErrorInterface;
    throw errorThrower(code, message);
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser.length) {
      throw errorThrower(
        400,
        "User already exist, please login using the proper username and password"
      );
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const id = await createNewUser(username, hashedPassword);
    return {
      id,
      created_at: new Date().toISOString(),
      point: 100,
      username,
    };
  } catch (err) {
    const { code, message } = err as CustomErrorInterface;
    throw errorThrower(code, message);
  }
};
