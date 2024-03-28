import { createBookUser } from "../repository/bookUser/createBookUser.js";
import { getBookUser } from "../repository/bookUser/getBookUser.js";

export const createOrder = async (userId: number, bookId: number) => {
  try {
		const existingOrder = await getBookUser(userId, bookId);
		if (existingOrder.length) {
			throw new Error("Order already exists")
		}
		await createBookUser(userId, bookId);
  } catch (err) {
		console.log("createOrder error: %v", err);
		throw new Error("Cannot create new order");
	}
};
