import { Next } from "../../../framework/types/serverPackageTypes";
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";
import { Ihashpassword } from "../../interface/service/hashPassword";
import ErrorHandler from "../../middleares/errorHandler";
import { Ijwt } from "../../interface/service/jwt";
import { error } from "console";

export const login = async (email: string, password: string, organizerRepository: IorganizerRepository, hashPassword: Ihashpassword,jwt:Ijwt, next: Next): Promise<object | void> => {
     try{
          console.log("here at organizer Usecase Part of organizer usecase/orgnaizer/organizer.ts")
     const organizer = await organizerRepository.findbyEmail(email)
     console.log(" the organizer", organizer)
     if (!organizer) return next(new ErrorHandler(400, "invalid email id"))
     if (organizer?.blocked) {
          return next(new ErrorHandler(400, "access has been denied by admin "))
     }
     const result = await hashPassword.comparePassword(password, organizer?.password)
     if (!result) return next(new ErrorHandler(400, "invalid password"))
     console.log("after comparing")
     console.log(organizer?._id)

     // const tokens = await jwt.createAccessAndRefreshToken(organizer?._id as string)
     const tokens = await jwt.createAccessAndRefreshToken(organizer?._id as string)
     // await cloudSession.createUserSession(organizer?._id as string, user)
 

     return {organizer,tokens}
     }catch(error){
          console.log(error)
          throw error
     }

}