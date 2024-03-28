import { query } from "../../entity/index.js";

export const createNewUser = async (username: string) => {
  try {
    const res = await query("INSERT INTO users (username, point) VALUES ($1, $2) RETURNING id", [
      username,
      "100",
    ]);
    const id = res.rows[0].id as number;
    return id;
  } catch (err) {
    console.log(`Error createNewUser: ${err}`);
    return 0;
  }
};
