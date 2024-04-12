import { query } from "../../entity/index.js";
import { BookInterface } from "../../entity/models/book.js";
import { BookUserInterface } from "../../entity/models/book_user.js";
import { errorThrower } from "../../utils/errorThrower.js";

export const getAllBookUser = async (userId?: string) => {
  try {
    let sqlQuery = "SELECT * FROM book_user";
    if (userId) {
      sqlQuery += " WHERE user_id=$1";
    }
    const res = await query(sqlQuery, userId ? [userId] : undefined);
    console.log(`getAllBookUser :`, res.rowCount);
    return res.rows as BookUserInterface[];
  } catch (err) {
    console.log("getAllBookUser err: %v", err);
    throw errorThrower(500, "Error when getting all order");
  }
};

export const getAllBookUserWithBookData = async (userId?: string) => {
  try {
    let sqlQuery = "SELECT books.id, title, writer, cover_image, point, tag FROM books INNER JOIN book_user ON book_user.book_id=books.id";
    if (userId) {
      sqlQuery += " WHERE book_user.user_id=$1";
    }
    const res = await query(sqlQuery, userId ? [userId] : undefined);
    console.log(`getAllBookUserWithBookData :`, res.rowCount);
    return res.rows as BookInterface[];
  } catch (err) {
    console.log("getAllBookUserWithBookData err: %v", err);
    throw errorThrower(500, "Error when getting all order with book data");
  }
};
