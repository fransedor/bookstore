import { createBookUser } from "../repository/bookUser/createBookUser.js";
import { deleteBookUser } from "../repository/bookUser/deleteBookUser.js";
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
		throw new Error((err as Error).message);
	}
};

export const deleteOrderService = async (userId: number, bookId: number) => {
  try {
		const existingOrder = await getBookUser(userId, bookId);
		if (!existingOrder.length) {
			throw new Error("Order does not exists")
		}
		await deleteBookUser(userId, bookId);
  } catch (err) {
		console.log("deleteOrderService error: %v", err);
		throw new Error((err as Error).message);
	}
};