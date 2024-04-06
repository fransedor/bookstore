import { QueryResult } from "pg";
import { query } from "../../entity/index.js";
import { UserInterface } from "../../entity/models/user.js";
import { errorThrower } from "../../utils/errorThrower.js";

export const alterUserPoint = async (userId: string, newPoint: number) => {
  try {
    (await query("UPDATE users SET point=$1 WHERE id=$2", [
      String(newPoint),
      String(userId),
    ])) as QueryResult<Omit<UserInterface, "created_at">>;

    console.log("alterUserPoint success");

    return null;
  } catch (err) {
    console.log(`Error alterUserByPoint: ${err}`);
    throw errorThrower(500, "Cannot modify users point");
  }
};
