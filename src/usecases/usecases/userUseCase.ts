import { Req, Res, Next } from "../../framework/types/serverPackageTypes";
import { IuserUseCase } from "../interface/usecase/userUseCase";
import { Iuser } from "../../entities/user";
import { userSignup, login, createUser, getUser, editProfile, uploadProfile, getOrganizers, eventPostDetails, getSeats, seatBooking, paymentStatus, bookingCreation, getAllCategory, getAllbookings } from "./user/index"
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
import { Iorganizer, IorganizerAndAddress } from "../../entities/organizer";
import { IorganizerRepository } from "../interface/repositoryInterface/organizerRepository";
import { IeventRepository } from "../interface/repositoryInterface/eventRepository";
import { IeventPostRepository } from "../interface/repositoryInterface/eventPostRepository";
import { IeventPost } from "../../entities/eventPost";
import { Ievents } from "../../entities/event";
import { payment } from "./user/payment";
import { Istripe } from "../interface/repositoryInterface/stripeRepository";
import { booking } from "../../entities/booking";
import { IbookingRepository } from "../interface/repositoryInterface/bookingRepository";
import { IeventCategory } from "../../entities/eventCategory";
import { IcategoryRepository } from "../interface/repositoryInterface/categoryRepository";
import { sentOtp } from "./user/sentOtp";
import { changePassword } from "./user/changePassword";
import { sendMessage } from "./message/sendMessage";
import { ImessageRepository } from "../interface/repositoryInterface/messageRepository";
import { IconversationRepository } from "../interface/repositoryInterface/conversationRepository";
import { getChat } from "./message/getChat";
// import { getAllbookings } from "./user/getAllbookings";


export class UserUseCase implements IuserUseCase {

     constructor(
          private userRepository: IuserRepository,
          private jwt: Ijwt,
          private otpGenerate: IotpGenerate,
          private otpRepository: IotpRepository,
          private sentEmail: IsentEmail,
          private hashPassword: Ihashpassword,
          private cloudSession: IcloudSession,
          private organizerRepository: IorganizerRepository,
          private eventPostRepository: IeventPostRepository,
          private eventRepository: IeventRepository,
          private stripeRepository: Istripe,
          private bookingRepository: IbookingRepository,
          private categoryRepository :IcategoryRepository,
          private messageRepository:ImessageRepository,
          private conversationRepository:IconversationRepository
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

     async getUser(id: string, next: Next): Promise<{ user: Iuser, address: Iaddress } | { user: Iuser } | undefined> {
          try {
               const user = await getUser(id, this.userRepository)
               console.log(" usecase user", user)
               return user ? user : undefined
          } catch (error) {
               catchError(error, next)
          }
     }

     async editProfile(id: string, formData: any, next: Next): Promise<{ user: Iuser; address: Iaddress; } | Iuser | undefined> {
          try {
               console.log(" in the usecase formda", formData, formData.name)
               const user = await editProfile(id, formData, this.userRepository)

               return user
          } catch (error) {
               catchError(error, next)
          }
     }
     async addProfilePicture(id: string, image: string, next: Next): Promise<boolean | undefined> {
          try {
               const uploaded = await uploadProfile(id, image, this.userRepository)
               return uploaded ? true : false
          } catch (error) {
               catchError(error, next)
          }
     }

     async resentOtp(email: string, next: Next): Promise<void> {
          try {
               const otp = await resentOpt(this.otpGenerate, this.sentEmail, this.otpRepository, email)
          } catch (error) {
               catchError(error, next)
          }
     }

     async allOrganizers(next: NextFunction): Promise<IorganizerAndAddress[] | undefined> {
          try {
               const allorganizers = await getOrganizers(this.organizerRepository)
               console.log("==========================================>", allorganizers)
               return allorganizers
          } catch (error) {
               catchError(error, next)
          }
     }

     async eventPostDetails(id: string, next: NextFunction): Promise<{ post: IeventPost; event: Ievents; organizer: { id: string; name: string; } } | undefined> {
          try {
               const details = await eventPostDetails(id, this.eventPostRepository, this.eventRepository, this.organizerRepository)
               return details ? details : undefined
          } catch (error) {
               catchError(error, next)
          }
     }

     async getSeats(id: string, next: Next): Promise<any | undefined> {
          try {
                console.log(" use casee")
               return await getSeats(id, this.eventPostRepository)
          } catch (error) {
               catchError(error, next)
          }
     }

     async seatBooking(id: string, selectedSeat: [],userId:string, next: NextFunction): Promise<any> {
          try {
               const response = await seatBooking(id, selectedSeat,userId, this.eventRepository)
                 console.log("-----------from the respsoe uses--------------------44--------------------",response)
               return response
          } catch (error) {
               catchError(error, next)
          }
     }

     async payment(eventId: string, userId: string, seats: [], amount: string,postId:string, next: Next): Promise<any> {
          try {
               console.log(" the amoundwssss----------------------", amount)
               const response = await payment(userId, eventId, seats, amount,postId , this.stripeRepository)
               console.log(response, "---------------use payment case------------------------")
               return response
          } catch (error) {
               catchError(error, next)
          }
     }

     async paymentStatus(req: Req, next: NextFunction): Promise<boolean | undefined> {
          try {
               const response = await paymentStatus(req, this.stripeRepository)
                  console.log("------------------ pauemtntSTatus usecase---------------",response)
               return response ? true : false

          } catch (error) {
               catchError(error, next)
          }
     }

     async booking(bookingData: booking, chargeId: string, next: NextFunction): Promise<any> {
          try {
               const response = await bookingCreation(bookingData, chargeId, this.bookingRepository,this.eventRepository)
                console.log(" ----------bookingssUsecase-----------",response)
               return response
          } catch (error) {
               catchError(error, next)
          }
     }
     
     async  getAllCategory(next: NextFunction): Promise<IeventCategory[] | undefined> {
          try{
               return await getAllCategory(this.categoryRepository)
              
           }catch(error){
               catchError(error,next)
           }
     }
     
     async  allBookings(id: string, next: NextFunction): Promise<any> {
         try{
             return await getAllbookings(id,this.bookingRepository,this.eventRepository)
         }catch(error){
             catchError(error,next)
         }
     }
     async  sentOtp(email: string, user: string, next: NextFunction): Promise<{ success: boolean; message: string;} | undefined> {
         try{
             return await sentOtp(email,user,this.otpGenerate,this.otpRepository,this.sentEmail,this.userRepository)
             
         }catch(error){
            catchError(error,next)
         }
     }

     async changePassword(password:string,email:string,next:Next):Promise<{success:boolean,message:string} | undefined>{
          try{
               return await changePassword(password,email,this.userRepository,this.hashPassword)
          }catch(error){
               catchError(error,next)
          }
     }

     async  sendMessage(senterId: string, receiverId: string, message: string, imageUrl: string,next:Next): Promise<any> {
         try{
             const sented = await sendMessage(senterId,receiverId,message,imageUrl,this.messageRepository,this.conversationRepository)
         }catch(error){
           catchError(error,next)
         }
     }


     async  findConversation(senterId: string, receiverId: string, next: NextFunction): Promise<any> {
         try{
            const chat = await getChat(senterId,receiverId,this.conversationRepository)
         }catch(error){
           catchError(error,next)
         }
     }

}

