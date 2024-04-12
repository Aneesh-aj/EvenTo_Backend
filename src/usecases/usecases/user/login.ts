 import { Next } from "../../../framework/types/serverPackageTypes";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IcloudSession } from "../../interface/service/cloudSession";
import { Ihashpassword } from "../../interface/service/hashPassword";
import ErrorHandler from "../../middleares/errorHandler";
import { IToken, Ijwt } from "../../interface/service/jwt";

export const login = async (userRepository: IuserRepository, jwt: Ijwt, cloudSession: IcloudSession, hashPassword: Ihashpassword, email: string, password: string, next: Next): Promise<object | void> => {
  try {
    const user = await userRepository.findbyEmail(email)
    console.log(" the checked", user)

    if (!user) return next(new ErrorHandler(400, "invalid email id"))
    if (user?.blocked) {
      return next(new ErrorHandler(400, "access has been denied by admin "))
    }
   console.log("after",password)
    const result = await hashPassword.comparePassword(password, user?.password)
    console.log("passowrd conparisom",result)
    if (!result) return next(new ErrorHandler(400, "invalid password"))
    console.log("after comparing")
    
    const tokens = await jwt.createAccessAndRefreshToken(user?._id as string)
    // await cloudSession.createUserSession(user?._id as string, user)

    return { user, tokens }
  } catch (error) {
    throw error
  }


}