import { QueryResult } from "pg";
import { query } from "../../entity/index.js";
import { UserInterface } from "../../entity/models/user.js";
import { errorThrower } from "../../utils/errorThrower.js";

export const getUserByUsername = async (username: string) => {
  try {
    const res = (await query("SELECT password, role FROM users WHERE username=$1", [
      username,
    ])) as QueryResult<Omit<UserInterface, "created_at">>;

    return res.rows;
  } catch (err) {
    console.log(`Error getUserByUsername: ${err}`);
    throw errorThrower(500, "Cannot get user");
  }
};
