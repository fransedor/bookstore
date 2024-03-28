import { QueryResult } from "pg";
import { query } from "../../entity/index.js";
import { BookInterface } from "../../entity/models/book.js";

export const getAllBooks = async (page: number, show: number) => {
	try {

		const LIMIT = show;
		const OFFSET = (page - 1) * show;
		
		const res = await query("SELECT * FROM books LIMIT $1 OFFSET $2", [String(LIMIT), String(OFFSET)]) as QueryResult<BookInterface>

		console.log(`getAllBooks: ${res.rowCount}`);

		return res.rows;
	} catch(err) {
		console.log(err);
		throw new Error("Failed to get all books")
	}
}