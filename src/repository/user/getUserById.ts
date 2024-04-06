import { QueryResult } from "pg";
import { query } from "../../entity/index.js";
import { UserInterface } from "../../entity/models/user.js";
import { errorThrower } from "../../utils/errorThrower.js";

export const getUserById = async (userId: number) => {
	try {
		const res = (await query("SELECT * FROM users WHERE id=$1", [
			String(userId),
    ])) as QueryResult<Omit<UserInterface, "created_at">>;

		console.log('getUserById', res.rows);

		return res.rows
	} catch(err) {
		console.log(`Error getUserById: ${err}`);
		throw errorThrower(500, "Cannot get details of user");
	}
};
