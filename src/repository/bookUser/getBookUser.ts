import { query } from "../../entity/index.js";

export const getBookUser = async (userId: number, bookId: number) => {
  try {
    const res = await query("SELECT user_id FROM book_user WHERE user_id=$1 AND book_id=$2", [
      String(userId),
      String(bookId),
    ]);
		console.log(`getBookUser :`, res.rowCount);
		return res.rows
  } catch (err) {
    console.log("getBookUser err: %v", err);
    throw new Error("Error getting order");
  }
};
