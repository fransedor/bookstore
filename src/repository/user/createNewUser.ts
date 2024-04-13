import { query } from "../../entity/index.js";
import { errorThrower } from "../../utils/errorThrower.js";

export const createNewUser = async (username: string, hashedPassword: string) => {
  try {
    const res = await query(
      "INSERT INTO users (username, point, password, role) VALUES ($1, $2, $3, $4) RETURNING id",
      [username, "100", hashedPassword, "public"]
    );
    const id = res.rows[0].id as number;
    return id;
  } catch (err) {
    console.log(`Error createNewUser: ${err}`);
    throw errorThrower(500, "Cannot create new user");
  }
};
