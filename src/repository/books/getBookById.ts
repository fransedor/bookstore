import { QueryResult } from "pg";
import { query } from "../../entity/index.js";
import { BookInterface } from "../../entity/models/book.js";
import { errorThrower } from "../../utils/errorThrower.js";

export const getBookById = async (bookId: number) => {
	try {
		const res = await query("SELECT * FROM books WHERE id=$1", [String(bookId)]) as QueryResult<BookInterface>

		console.log(`getBooksById: ${res.rowCount}`);

		return res.rows;
	} catch(err) {
		console.log("Error getBookById: ", err);
		throw errorThrower(500, "Failed to get book by id");
	}
}