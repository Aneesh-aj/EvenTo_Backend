import { Req, Res, Next } from "../../frameWork/types/serverPackageTypes";

import { IuserUseCase } from "../interface/usecase/userUseCase";
import { Iuser } from "../../entities/user";
import { login } from "./user/login";
import { createUser } from "./user/createUser";
import { userSignup } from "./user/signup";
import { IuserRepository } from "../interface/repositoryInterface/userRepository";
import { Iuserjwt } from "../interface/service/jwt";
import { NextFunction } from "express";
import { IotpGenerate } from "../interface/service/otpGenerate";
import { Ihashpassword } from "../interface/service/hashPassword";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository";
import { IsentEmail } from "../interface/service/sentEmail";


export class UserUseCase implements IuserUseCase {

     private readonly userRepository: IuserRepository
     private readonly jwt: Iuserjwt
     private readonly otpGenerate: IotpGenerate
     private readonly otpRepository: IotpRepository
     private readonly sentEmail: IsentEmail
     private readonly hashPassword: Ihashpassword

     constructor(
          userRepository: IuserRepository,
          jwt: Iuserjwt,
          otpGenerate: IotpGenerate,
          otpRepository: IotpRepository,
          sentEmail: IsentEmail,
          hashPassword: Ihashpassword
     ) {
          this.userRepository = userRepository
          this.jwt = jwt
          this.otpGenerate = otpGenerate
          this.otpRepository = otpRepository
          this.sentEmail = sentEmail
          this.hashPassword = hashPassword
     }
     async userSignup(email: string, next: Next): Promise<string | void> {
          try {
               let result = await userSignup(this.otpRepository, this.otpGenerate, email, this.sentEmail)
               return
          } catch (error) {
               throw (error)
          }
     }
     async login(email: string, password: string, next: NextFunction): Promise<any | void> {
          let Tokens = login(this.userRepository,
               this.jwt,
               email,
               password)

          console.log("on the return ", Tokens)
          return Tokens
     }

     async createUser(newUser: Iuser, otp: string, next: NextFunction): Promise<string | void> {
          try {
               const user = await createUser(newUser, otp, this.otpRepository, this.userRepository, this.hashPassword, this.jwt)
               return user
          } catch (error) {
               throw error
          }
     }





}