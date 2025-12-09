import { verifyJwt, signJwt } from "../../utils/jwt.utils";
import config from "../../../config/index";
import { prisma } from "../../../db/prisma";

export async function reIssueAccessToken(refreshToken: string) {
  const { decoded } = verifyJwt(refreshToken, "REFRESH_TOKEN_PUBLIC_KEY");

  
  if (!decoded || typeof decoded === "string") return false;

  const sessionId = decoded.session;   

  if (!sessionId) return false;

  const session = await prisma.adminSession.findUnique({
    where: { id: sessionId },   
  });

  if (!session || !session.valid) return false;

  const user = await prisma.admin.findUnique({
    where: { id: session.adminId },
  });

  if (!user) return false;

  const accessToken = signJwt(
    {
      id: user.id,
      email: user.email,
      session: session.id,   
    },
    "ACCESS_TOKEN_PRIVATE_KEY",
    { expiresIn: config.ACCESS_TOKEN_TTL }
  );

  return accessToken;
}
