import { Request, Response, NextFunction } from 'express';
import { reIssueAccessToken } from './reissueToken';
import { verifyJwt } from '../../utils/jwt.utils';
import { prisma } from '../../../db/prisma'; 
import { parseTTL } from '../../utils/parseTTL';
import config from '../../../config/index';

const deserializeAdmin = async (req: Request, res: Response, next: NextFunction) => {

  // 1. Extract tokens (cookie, header, query, body)
  let accessToken = req.cookies?.accessToken;
  let refreshToken = req.cookies?.refreshToken;

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

  // No token at all
  if (!accessToken) return next();

  // 2. Verify token
  const { decoded, expired } = verifyJwt(accessToken, "ACCESS_TOKEN_PUBLIC_KEY");

  // If token is valid → CHECK SESSION VALIDITY
  if (decoded) {
    // Check session in DB
    const session = await prisma.adminSession.findUnique({
      where: { id: decoded.session }
    });

    // ❌ Session does not exist or is invalid => force logout
    if (!session || !session.valid) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return next(); // user becomes unauthenticated
    }

    // ✔ Token good + session valid
    res.locals.user = decoded;
    return next();
  }

  // 3. If token expired → refresh
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: parseTTL(config.ACCESS_TOKEN_TTL)
      });

      const result = verifyJwt(newAccessToken, "ACCESS_TOKEN_PUBLIC_KEY");
      if (!result.decoded) {
  return next();
}

      // Again check session validity
      const session = await prisma.adminSession.findUnique({
        where: { id: result.decoded.session }
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
