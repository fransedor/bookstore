import { query } from "../../entity/index.js";
import { errorThrower } from "../../utils/errorThrower.js";

export const deleteBookUser = async (userId: string, bookId: string) => {
  try {
    await query("DELETE FROM book_user WHERE user_id=$1 AND book_id=$2", [
      String(userId),
      String(bookId),
    ]);
  } catch (err) {
    console.log("deleteBookUser err: %v", err);
    throw errorThrower(500, "Cannot delete order");
  }
};
