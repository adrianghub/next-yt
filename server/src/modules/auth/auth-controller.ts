import { Request, Response } from "express";
import { IS_PROD } from "@constants";
import { findUserByEmail } from "@modules/user/user-service";
import { StatusCodes } from "http-status-codes";
import { signJwt } from "./auth-util";
import omitObjProperty from "@helpers/omitObjProperty";
import { LoginBody } from "./auth-schema";

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user || !user.comparePassword(password)) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Invalid credentials.");
  }

  const payload = omitObjProperty(user.toJSON(), ["password", "_v"]);

  const jwt = signJwt(payload);

  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: process.env.DOMAIN || "localhost",
    path: "/",
    sameSite: "strict",
    secure: IS_PROD,
  });

  return res.status(StatusCodes.OK).send(jwt);
}
