import { getUserById } from "../repository/user/getUserById.js"
import { errorThrower } from "../utils/errorThrower.js";
import { ServiceReturnInterface } from "../utils/types.js";

export const getUserByIdService = async (id: string) => {
	try {
		const users = await getUserById(id);
		if (!users.length) {
			throw errorThrower(404, "User not found")
		}
		return users[0];
	} catch (err) {
		const { code, message } = err as ServiceReturnInterface<null>
		throw errorThrower(code, message || "Cannot get user details")
	}
}