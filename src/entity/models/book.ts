export interface BookInterface {
	id: string;
	title: string;
	writer: string;
	cover_image: string;
	point: number;
	tag: "fiction" | "non-fiction" | "science" | "essay"
}