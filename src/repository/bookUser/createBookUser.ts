import { query } from "../../entity/index.js";
import { errorThrower } from "../../utils/errorThrower.js";

export const createBookUser = async (userId: string, bookId: string) => {
  try {
    await query("INSERT INTO book_user (user_id, book_id) VALUES ($1, $2)", [
      String(userId),
      String(bookId),
    ]);
  } catch (err) {
    console.log("createBookUser err: %v", err);
    throw errorThrower(500, "Cannot create order");
  }
};
