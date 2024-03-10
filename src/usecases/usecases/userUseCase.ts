import { Req, Res, Next } from "../../framework/types/serverPackageTypes";

import { IuserUseCase } from "../interface/usecase/userUseCase";
import { Iuser } from "../../entities/user";
import { login } from "./user/login";
import { createUser } from "./user/createUser";
import { userSignup } from "./user/signup";
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

     private readonly userRepository: IuserRepository
     private readonly jwt: Ijwt
     private readonly otpGenerate: IotpGenerate
     private readonly otpRepository: IotpRepository
     private readonly sentEmail: IsentEmail
     private readonly hashPassword: Ihashpassword
     private readonly cloudSession: IcloudSession

     constructor(
          userRepository: IuserRepository,
          jwt: Ijwt,
          otpGenerate: IotpGenerate,
          otpRepository: IotpRepository,
          sentEmail: IsentEmail,
          hashPassword: Ihashpassword,
          cloudSession: IcloudSession
     ) {
          this.userRepository = userRepository
          this.jwt = jwt
          this.otpGenerate = otpGenerate
          this.otpRepository = otpRepository
          this.sentEmail = sentEmail
          this.hashPassword = hashPassword
          this.cloudSession = cloudSession
     }
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