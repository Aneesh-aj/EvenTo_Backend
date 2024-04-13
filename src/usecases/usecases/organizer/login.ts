import { Next } from "../../../framework/types/serverPackageTypes";
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";
import { Ihashpassword } from "../../interface/service/hashPassword";
import ErrorHandler from "../../middleares/errorHandler";
import { IToken, Ijwt } from "../../interface/service/jwt";

import { error } from "console";
import { Iorganizer } from "../../../entities/organizer";

export const login = async (email: string, password: string, organizerRepository: IorganizerRepository, hashPassword: Ihashpassword, jwt: Ijwt, next: Next): Promise<{ organizer: Iorganizer, tokens: IToken } | void> => {
     try {
          console.log("here at organizer Usecase Part of organizer usecase/orgnaizer/organizer.ts")
          const org = await organizerRepository.findbyEmail(email)
          console.log(" the organizer", org)
          if (!org) return next(new ErrorHandler(400, "invalid email id"))
          if (org?.blocked) {
               return next(new ErrorHandler(400, "access has been denied by admin "))
          }
          const result = await hashPassword.comparePassword(password, org?.password)
          if (!result) return next(new ErrorHandler(400, "invalid password"))
          console.log("after comparing")
          console.log(org?._id)
          const organizer = await organizerRepository.changeStatus(org?._id as string)


          const tokens = await jwt.createAccessAndRefreshToken(organizer?._id as string)

          if (organizer) {
               return { organizer, tokens }
          } else {
               return
          }


     } catch (error) {
          console.log(error)
          throw error
     }

}
