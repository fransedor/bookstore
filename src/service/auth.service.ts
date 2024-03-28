import { createNewUser } from "../repository/user/createNewUser.js";
import { getUserByUsername } from "../repository/user/getUserByUsername.js";

export const loginByUsername = async (username: string) => {
  try {
		const users = await getUserByUsername(username);
		if (!users.length) {
			const id = await createNewUser(username);
			return {
				id,
				created_at: new Date().toISOString(),
				point: 100,
				username
			}
		}
		return users[0]
  } catch (err) {
		console.log(err);
  }
};
