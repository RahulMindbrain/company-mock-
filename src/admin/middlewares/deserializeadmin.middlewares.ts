import { Request, Response, NextFunction } from "express";
import { reIssueAccessToken } from "./reissueToken";
import { verifyJwt } from "../../utils/jwt.utils";
import { prisma } from "../../../db/prisma";
import { parseTTL } from "../../utils/parseTTL";
import config from "../../../config/index";
import { isPort } from "class-validator";
import log from "../../utils/logger";

const deserializeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 

  
  let accessToken = req.cookies?.accessToken;
  let refreshToken = req.cookies?.refreshToken;

  const isProduction = process.env.NODE_ENV === "production";

  if (!accessToken && req.headers.authorization?.startsWith("Bearer ")) {
    accessToken = req.headers.authorization.split(" ")[1];
  }

  if (!accessToken && req.query.accessToken) {
    accessToken = req.query.accessToken as string;
  }
  if (!refreshToken && req.query.refreshToken) {
    refreshToken = req.query.refreshToken as string;
  }

  if (!accessToken && req.body?.accessToken) {
    accessToken = req.body.accessToken;
  }
  if (!refreshToken && req.body?.refreshToken) {
    refreshToken = req.body.refreshToken;
  }

  
  if (!accessToken) return next();

  
  const { decoded, expired } = verifyJwt(
    accessToken,
    "ACCESS_TOKEN_PUBLIC_KEY"
  );

  
  if (decoded) {
    // Check session in DB
    const session = await prisma.adminSession.findUnique({
      where: { id: decoded.session },
    });

     if (!session || !session.valid) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return next(); 
    }

    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
        maxAge: parseTTL(config.ACCESS_TOKEN_TTL),
      });

      const result = verifyJwt(newAccessToken, "ACCESS_TOKEN_PUBLIC_KEY");
      if (!result.decoded) {
        return next();
      }

      const session = await prisma.adminSession.findUnique({
        where: { id: result.decoded.session },
      });

      if (!session || !session.valid) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return next();
      }

      res.locals.user = result.decoded;
    }
  }

  return next();
};

export default deserializeAdmin;
