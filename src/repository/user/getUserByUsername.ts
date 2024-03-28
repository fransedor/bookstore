import { QueryResult } from "pg";
import { query } from "../../entity/index.js";
import { UserInterface } from "../../entity/models/user.js";

export const getUserByUsername = async (username: string) => {
    const res = (await query("SELECT (id, username, point) FROM users WHERE username=$1", [
      username,
    ])) as QueryResult<Omit<UserInterface, "created_at">>;

		return res.rows
};
