
import { Prisma } from "@prisma/client";
import config from "../../../config/index";
import { AppError } from "../../utils/appError";
import { AppSuccess } from "../../utils/appSuccess";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { signJwt } from "../../utils/jwt.utils";
import log from "../../utils/logger";
import { CreateSessionDto, UpdateAdminSessionDto } from "../dtos/admin.session.dto";
import { validatePassword } from "../middlewares/passwordHash";
import { AdminRepository } from "../repositories/admin.repository";
import { AdminSessionRepository } from "../repositories/admin.session.repository";


export class AdminSessionService {
  private readonly sessionRepo: AdminSessionRepository;
  private readonly adminRepo: AdminRepository;
  constructor() {
    this.sessionRepo = new AdminSessionRepository();
    this.adminRepo = new AdminRepository();
  }

  async createSession(data:CreateSessionDto,ip:string,userAgent:string) {
    const { email, password } = data;

    const exist = await this.adminRepo.findByEmail(data.email);
    if (!exist) {
      throw new AppError(
        ERROR_CODES.DATA_INSUFFICIENT,
        ERROR_MESSAGES.DATA_INSUFFICIENT,
        HTTP_STATUS.UNPROCESSABLE_ENTITY
      );
    }
    // log.info(exist);
    const isValid = await validatePassword(password,exist.password)

      if (!isValid) {
    throw new AppError(
      ERROR_CODES.USER_NOT_FOUND,
      ERROR_MESSAGES.USER_NOT_FOUND,
      HTTP_STATUS.NOT_FOUND
    ); 
  }

   const session = await this.sessionRepo.createSession(exist.id,ip,userAgent);

   if(!session){
     throw new AppError(
      ERROR_CODES.AUTH_FAILED,
      ERROR_MESSAGES.AUTH_FAILED,
      HTTP_STATUS.UNAUTHORIZED
    ); 
   }

  //create accessToken and refreshToken

    const accessToken = signJwt(
    { ...exist, session: session.id },
    "ACCESS_TOKEN_PRIVATE_KEY",
    { expiresIn: config.ACCESS_TOKEN_TTL} 
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...exist, session: session.id },
    "REFRESH_TOKEN_PRIVATE_KEY",
    { expiresIn: config.REFRESH_TOKEN_TTL } 
  );

  

  return {accessToken,refreshToken}


  }

 async  findSessions(id:number) {
  return this.sessionRepo.findById(id);
}

 async  updateSession(id:number,data:UpdateAdminSessionDto) {
  return this.sessionRepo.update(id, data);
}

}





