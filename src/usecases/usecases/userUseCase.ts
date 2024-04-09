import { Req, Res, Next } from "../../framework/types/serverPackageTypes";

import { IuserUseCase } from "../interface/usecase/userUseCase";
import { Iuser } from "../../entities/user";
import {userSignup,login,createUser} from "./user/index"
import { IuserRepository } from "../interface/repositoryInterface/userRepository";
import { Ijwt } from "../interface/service/jwt";
import { NextFunction } from "express";
import { IotpGenerate } from "../interface/service/otpGenerate";
import { Ihashpassword } from "../interface/service/hashPassword";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository";
import { IsentEmail } from "../interface/service/sentEmail";
import { IcloudSession } from "../interface/service/cloudSession";
import { catchError } from "../middleares/catchError";


export class UserUseCase implements IuserUseCase {

     constructor( 
        private  userRepository: IuserRepository,
        private  jwt: Ijwt,
        private  otpGenerate: IotpGenerate,
        private  otpRepository: IotpRepository,
        private  sentEmail: IsentEmail,
        private  hashPassword: Ihashpassword,
        private  cloudSession: IcloudSession
     ) { }
     async userSignup(user: Iuser, next: Next): Promise<string | void> {
          try {
               console.log("coming here")
               let toke = await userSignup(
                    this.jwt,
                    this.otpRepository,
                    this.userRepository,
                    this.otpGenerate,
                    this.hashPassword,
                    user,
                    this.sentEmail,
                    next)
               console.log(" the token", toke)
               return toke
          } catch (error: unknown) {
               console.log(" in here")
               catchError(error, next)
          }
     }
     async login(email: string, password: string, next: NextFunction): Promise<any | void> {
          try {
               console.log(" in the use case",password)
               return await login(this.userRepository,
                    this.jwt,
                    this.cloudSession,
                    this.hashPassword,
                    email,
                    password,
                    next
               )
          } catch (error: unknown) {
               catchError(error, next)
          }
     }

     async createUser(token: string, otp: string, next: NextFunction): Promise<Iuser | void> {
          try {
               const user = await createUser(
                    token,
                    otp,
                    this.otpRepository,
                    this.userRepository,
                    this.hashPassword,
                    this.jwt,
                    next)
                    console.log("in the usecase" ,user)
               return user
          } catch (error) {
               catchError(error,next)
          }
     }
}