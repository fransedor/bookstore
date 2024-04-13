export interface UserInterface {
  id: number;
  username: string;
  password: string;
	role: "admin" | "public";
  point: number;
  created_at: string;
}
