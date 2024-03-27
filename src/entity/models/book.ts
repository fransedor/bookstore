export interface BookInterface {
  id: number;
  title: string;
  writer: string;
  cover_image: string;
  point: number;
  tag: "fiction" | "non-fiction" | "science" | "essay";
  created_at: string;
}
