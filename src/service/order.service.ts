import { createBookUser } from "../repository/bookUser/createBookUser.js";
import { deleteBookUser } from "../repository/bookUser/deleteBookUser.js";
import { getBookUser } from "../repository/bookUser/getBookUser.js";
import { errorThrower } from "../utils/errorThrower.js";
import { ServiceReturnInterface } from "../utils/types.js";

export const createOrder = async (userId: number, bookId: number): Promise<ServiceReturnInterface<null>> => {
  try {
		const existingOrder = await getBookUser(userId, bookId);
		if (existingOrder.length) {
			throw new Error("Order already exists")
		}
		await createBookUser(userId, bookId);
		return {
			code: 200,
			error: false,
			data: null
		}
  } catch (err) {
		console.log("createOrder error: %v", err);
		throw {
			code: 500,
			error: true,
			message: (err as Error).message
		}
	}
};

export const deleteOrderService = async (userId: number, bookId: number): Promise<ServiceReturnInterface<null>> => {
  try {
		const existingOrder = await getBookUser(userId, bookId);
		if (!existingOrder.length) {
			throw new Error("Order does not exists")
		}
		await deleteBookUser(userId, bookId);
		return {
			code: 200,
			error: false,
			data: null
		}
  } catch (err) {
		console.log("deleteOrderService error: %v", err);
		throw errorThrower(500, (err as Error).message)
	}
};