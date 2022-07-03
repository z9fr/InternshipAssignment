import { sign } from "jsonwebtoken";
import env from "../config/env";
import { IJwtToken } from "@surgeintern/common/types";

export const createAccessToken = (options: IJwtToken) => {
  return sign(
    {
      id: options?.id,
      email: options?.email,
      accountType: options?.accountType,
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
