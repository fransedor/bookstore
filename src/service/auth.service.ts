import { UserInterface } from "../entity/models/user.js";
import { getUserByUsername } from "../repository/user/getUserByUsername.js";

export const loginByUsername = async (username: string) => {
  try {
		const users = await getUserByUsername(username);
		if (!users.length) {
			return 
		}
		return users[0]
  } catch (err) {
    return {
      id: 1,
      created_at: "abc",
      point: 100,
      username,
    };
  }
};
