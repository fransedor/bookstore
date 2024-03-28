import { QueryResult } from "pg";
import { query } from "../../entity/index.js";
import { UserInterface } from "../../entity/models/user.js";

export const getUserByUsername = async (username: string) => {
	try {
		const res = (await query("SELECT * FROM users WHERE username=$1", [
			username,
    ])) as QueryResult<Omit<UserInterface, "created_at">>;

		console.log('getUserByUsername', res.rows);

		return res.rows
	} catch(err) {
		console.log(`Error getUserByUsername: ${err}`);
		return [];
	}
};
