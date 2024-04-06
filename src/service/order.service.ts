import { createBookUser } from "../repository/bookUser/createBookUser.js";
import { deleteBookUser } from "../repository/bookUser/deleteBookUser.js";
import { getBookUser } from "../repository/bookUser/getBookUser.js";
import { getBookById } from "../repository/books/getBookById.js";
import { alterUserPoint } from "../repository/user/alterUserPoint.js";
import { getUserById } from "../repository/user/getUserById.js";
import { errorThrower } from "../utils/errorThrower.js";
import { ServiceReturnInterface } from "../utils/types.js";

export const createOrder = async (
  userId: string,
  bookId: string
): Promise<ServiceReturnInterface<null>> => {
  try {
    const existingOrder = await getBookUser(userId, bookId);
    // Check if order exists
    if (existingOrder.length) {
      throw errorThrower(400, "Order already exists");
    }
    // Check if customer has enough points to buy book
    const buyingCustomer = await getUserById(userId);
    if (!buyingCustomer.length) {
      throw errorThrower(404, "Invalid user");
    }
    const buyingCustomerPoints = buyingCustomer[0].point;
    const boughtBook = await getBookById(bookId);
    if (!boughtBook.length) {
      throw errorThrower(404, "Book does not exist");
    }
    const bookPrice = boughtBook[0].point;

    if (buyingCustomerPoints < bookPrice) {
      throw errorThrower(400, "Not enough points to buy book");
    }

    // Create order
    await createBookUser(userId, bookId);
    // Deduce the current user point by the book price
    await alterUserPoint(userId, buyingCustomerPoints - bookPrice);

    return {
      code: 200,
      error: false,
      data: null,
    };
  } catch (err) {
    console.log("createOrder error: %v", err);
    const { code, message } = err as ServiceReturnInterface<null>;
    throw {
      code,
      error: true,
      message,
    };
  }
};

export const deleteOrderService = async (
  userId: string,
  bookId: string
): Promise<ServiceReturnInterface<null>> => {
  try {
    const existingOrder = await getBookUser(userId, bookId);
    if (!existingOrder.length) {
      throw errorThrower(404, "Order does not exists");
    }
    await deleteBookUser(userId, bookId);
    // The points get refunded to the buying customer
    const buyingCustomer = await getUserById(userId);
    if (!buyingCustomer.length) {
      throw errorThrower(404, "Invalid user");
    }
    const buyingCustomerPoints = buyingCustomer[0].point;
    const boughtBook = await getBookById(bookId);
    if (!boughtBook.length) {
      throw errorThrower(404, "Book does not exist");
    }
    const bookPrice = boughtBook[0].point;

    await alterUserPoint(userId, buyingCustomerPoints + bookPrice);

    return {
      code: 200,
      error: false,
      data: null,
    };
  } catch (err) {
    console.log("deleteOrderService error: %v", err);
    throw errorThrower(500, (err as Error).message);
  }
};
