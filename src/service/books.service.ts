import { getAllBooks } from "../repository/books/getAllBooks.js";

export const getAllBooksService = async (page: number, show: number) => {
	try {
		const books = await getAllBooks(page, show);
		return books;
	} catch(err) {
		console.log(err);
		throw new Error("Error get all books");
	}
}