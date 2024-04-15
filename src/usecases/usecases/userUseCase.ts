import { Req, Res, Next } from "../../framework/types/serverPackageTypes";
import { IuserUseCase } from "../interface/usecase/userUseCase";
import { Iuser } from "../../entities/user";
import { userSignup, login, createUser, getUser, editProfile, uploadProfile } from "./user/index"
import { IuserRepository } from "../interface/repositoryInterface/userRepository";
import { Ijwt } from "../interface/service/jwt";
import { NextFunction } from "express";
import { IotpGenerate } from "../interface/service/otpGenerate";
import { Ihashpassword } from "../interface/service/hashPassword";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository";
import { IsentEmail } from "../interface/service/sentEmail";
import { IcloudSession } from "../interface/service/cloudSession";
import { catchError } from "../middleares/catchError";
import { Iaddress } from "../../entities/address";
import { resentOpt } from "./otp/otp";


export class UserUseCase implements IuserUseCase {

     constructor(
          private userRepository: IuserRepository,
          private jwt: Ijwt,
          private otpGenerate: IotpGenerate,
          private otpRepository: IotpRepository,
          private sentEmail: IsentEmail,
          private hashPassword: Ihashpassword,
          private cloudSession: IcloudSession
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
               console.log(" in the use case", password)
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
               console.log("in the usecase", user)
               return user
          } catch (error) {
               catchError(error, next)
          }
     }

     async getUser(id:string, next:Next):Promise<{user:Iuser,address:Iaddress}| {user:Iuser} | undefined>{
          try {
               const user = await getUser(id,this.userRepository)
               console.log(" usecase user",user)
               return user? user  : undefined
         } catch (error) {
               catchError(error, next)
          }
     }
     
     async  editProfile(id: string, formData: any,next:Next): Promise<{ user: Iuser; address: Iaddress; } | Iuser | undefined> {
         try{
            console.log(" in the usecase formda",formData,formData.name)
            const user = await editProfile(id, formData,this.userRepository)

            return user
         }catch(error){
             catchError(error,next)
         }
     }
     async  addProfilePicture(id: string, image: string, next: Next): Promise<boolean | undefined> {
         try{
             const uploaded = await uploadProfile(id,image,this.userRepository)
             return uploaded?true:false
         }catch(error){
            catchError(error,next)
         }
     }

     async  resentOtp(email: string,next:Next): Promise<void> {
          try{
                 const otp = await resentOpt(this.otpGenerate,this.sentEmail,this.otpRepository,email)
          }catch(error){
               catchError(error,next)
          }
     } 

}

