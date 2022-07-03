import { verify } from "jsonwebtoken";
import { IJwtToken } from "@surgeintern/common/types";
import env from "../config/env";

export const decodedPayload = (token: string): IJwtToken => {
  const payload: IJwtToken = verify(token!, env.ACCESS_TOKEN_SECRET!);
  return payload;
};
