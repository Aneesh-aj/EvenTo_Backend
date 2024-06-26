import { IorganizerRepository } from "../interface/repositoryInterface/organizerRepository";
import { IorganizerUseCase } from "../interface/usecase/organizerUseCase";
import { Ihashpassword } from "../interface/service/hashPassword";
import { allDetailsById, approvalChecking, changeStatus, createEvents, createOrganizers, deletePost, eventGraph, eventPostCreation, getAllCategory, getAllbookings, getAlleventPost, getCategory, getData, getEventDetails, getUpcomingEvent, login, postCreation, postFetching, profileEdit, revenue, signup, updateEvent, updateEventPost, updatePosts, uploadBackground, uploadProfile } from './organizer/index'
import { IotpGenerate } from "../interface/service/otpGenerate";
import { IsentEmail } from "../interface/service/sentEmail";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository";
import { Next } from "../../framework/types/serverPackageTypes";
import { catchError } from "../middleares/catchError";
import { verifyOtp } from "./organizer/verifyOtp";
import { Iorganizer, IorganizerAndAddress, IprofileFormData } from "../../entities/organizer";
import { IToken, Ijwt } from "../interface/service/jwt";
import { NextFunction, response } from "express";
import { resentOpt } from "./otp/otp";
import { IcategoryRepository } from "../interface/repositoryInterface/categoryRepository";
import { IeventCategory } from "../../entities/eventCategory";
import { IeventRepository } from "../interface/repositoryInterface/eventRepository";
import { IeventFormData, Ievents } from "../../entities/event";
import { getAllEvents } from "./organizer/getAllEvents";
import { IeventPost } from "../../entities/eventPost";
import { IeventPostRepository } from "../interface/repositoryInterface/eventPostRepository";
import { cancelEvent } from "./organizer/cancelEvent";
import { eventPostsById } from "./organizer/eventPostsById";
import { IbookingRepository } from "../interface/repositoryInterface/bookingRepository";
import { IrequestRepository } from "../interface/repositoryInterface/requestRepository";
import { getAllRequests } from "./request/getAllRequests";
import { Irequest } from "../../entities/request";
import { getRequestDetails } from "./request/getDetails";
import { rejectRequest } from "./request/rejectRequest";
import { approveRequest } from "./request/approveRequest";
import { requestEventCreation } from "./request/requestEventCreation";
import { getUserList } from "./message/getUserList";
import { IuserRepository } from "../interface/repositoryInterface/userRepository";
import { IconversationRepository } from "../interface/repositoryInterface/conversationRepository";
import { Ipost } from "../../entities/posts";
import { IpostRepository } from "../interface/repositoryInterface/postRepository";

export class OrganizerUseCase implements IorganizerUseCase {
  

    constructor(
       private organizerRepository: IorganizerRepository,
       private hashpassword: Ihashpassword,
       private otpGenerate: IotpGenerate,
       private otpRepository: IotpRepository,
       private sentEmail: IsentEmail,
       private jwt : Ijwt,
       private categoryRepository: IcategoryRepository,
       private eventRepository :IeventRepository,
       private eventPostRepository : IeventPostRepository,
       private bookingRepository :IbookingRepository,
       private requestRepository:IrequestRepository,
       private userRepository : IuserRepository,
       private conversationRepository:IconversationRepository,
       private postRepository:IpostRepository
    ) {
    }

    async signupOrganzier(email: string,name:string,next:Next): Promise<boolean | void> {
        try {
         
          const  result = await signup(this.otpGenerate, this.otpRepository, name,email, this.sentEmail,next)
          console.log(" the result",result)
          return result
        } catch (error) {
            catchError(error,next)
        }
    }

    async createOrganizer({ name, email, password, country, state, city, pincode, ownerId, phoneNumber, companyLicense, companyInsurance, bankPassbook, building, otp }: { name: string; email: string; password: string; country: string; state: string; city: string; pincode: number; ownerId: any; phoneNumber: string; companyLicense: any; companyInsurance: any; bankPassbook: any; building: string; otp: string }, next: Next): Promise<Iorganizer | void> {
        try {
            console.log('here at the usecase and email', email, "and ", name)
            const result = await createOrganizers(
                this.organizerRepository,
                this.hashpassword,
                name,
                email,
                password,
                ownerId,
                phoneNumber,
                companyLicense,
                companyInsurance,
                bankPassbook,
                building,
                country,
                state,
                city,
                pincode,
                otp,
                this.otpRepository,
                next
            )
            console.log('the result')
            return result
        } catch (error) {
            catchError(error,next)
        }
    }


    async  verifyOtp(email: string, otp: string, next: Next): Promise<{success:boolean,message:string} | void> {
        try{
             const result = await verifyOtp(
                this.otpRepository,
                email,
                otp,
                next
             )
             console.log("the reslut",result)
             return result
        }catch(error){
            catchError(error,next)
        }
    }

    async isApproved(id: string, next: Next): Promise<boolean> {
        const  result = await approvalChecking(id,this.organizerRepository)
        return result
    }


    async  login(email: string, password: string, next: Next): Promise<{organizer:Iorganizer,tokens:IToken} | void> {
        try{
            const result = await login(email,password,this.organizerRepository,this.hashpassword,this.jwt,next)
        return result
        }catch(error:any){
            console.log(error)
            console.log("inside the usecase",error)
            console.error(error)
        }
    }

    async  uploedImage(id:string ,url: string, next: Next): Promise<string | null> {
            console.log("in the usecase")
            return await uploadBackground(id,url,this.organizerRepository)
    }

    async  allDetailsById(id: string, next: Next): Promise<IorganizerAndAddress | undefined> {
         try{
            console.log("entering")
            const result =  await allDetailsById(id,this.organizerRepository)
            console.log("usecase result")
            return result ? result: undefined
         }catch(error){
            catchError(error,next)
         }
    }
    
    async  uploadProfile(id: string, url: string, next: Next): Promise<string | null> {
        return await uploadProfile(id,url,this.organizerRepository)

    }
    async resentOtp(email: string, next: NextFunction): Promise<void> {
        try{
            const otp = await resentOpt(this.otpGenerate,this.sentEmail,this.otpRepository,email)
     }catch(error){
          catchError(error,next)
     }   
    }

    async getAllCategory( next: NextFunction): Promise<IeventCategory[] | undefined> {
        try{
            return await getAllCategory(this.categoryRepository)
           
        }catch(error){
            catchError(error,next)
        }
    }
    async  editProfile(id: string, formData: IprofileFormData, next: NextFunction): Promise<void> {
        try{
            // console.log(formData,"in the usecase pllll")
            return  await profileEdit(id,formData,this.organizerRepository)
        }catch(error){
             catchError(error,next)
        }
    }

    async  getCategory(id: string, next: NextFunction): Promise<[] | undefined> {
        try{
            console.log("herer in use")
            return await getCategory(id,this.organizerRepository)
        }catch(error){
            catchError(error,next)
        }
    }

    async  createEvent(data: IeventFormData, next: NextFunction): Promise<{success:boolean, message:string} | undefined> {
        try{
              const result =  await createEvents(data,this.eventRepository)
            return  result ?  {success:true,message:"successfully event Created"} : undefined
        }catch(error){
            catchError(error,next)
        }
    }
    async  eventUpdate(data: IeventFormData,eventId:string, next: NextFunction): Promise<{success:boolean, message:string} | undefined> {
        try{
              const result =  await updateEvent(data,eventId,this.eventRepository)
            return  result ?  {success:true,message:"successfully event Created"} : undefined
        }catch(error){
            catchError(error,next)
        }
    }


    async  getAllevents(id: string,limit:number,offset:number, next: NextFunction): Promise<Ievents[] | undefined> {
        try{
             const reponse =  await getAllEvents(id,limit,offset,this.eventRepository)
             return response ? reponse : undefined
        }catch(error){
            catchError(error,next)
        }
    }

    async  getEventDetails(id: string, next: NextFunction): Promise<Ievents |{event:Ievents , organizer:Iorganizer} | undefined> {
        try{
            console.log(" coming here in usecase",id)
            const response = await getEventDetails(id,this.eventRepository,this.organizerRepository)
            return response ? response : undefined
        }catch(error){
             catchError(error,next)
        }
    }

    async  eventPost(data: IeventPost, next: NextFunction): Promise<IeventPost | undefined> {
        try{
              console.log(" usecase _____----------------_-",data)
             const event = await eventPostCreation(data,this.eventRepository,this.eventPostRepository)
              console.log(" in the usease ",event)
             return event ? event : undefined
        }catch(error){
           catchError(error,next)
        }
    }

    async  getAlleventPost(next: Next): Promise<IeventPost [] | undefined> {
        try{
           const posts = await getAlleventPost(this.eventPostRepository)
           return posts ? posts : undefined
        }catch(error){
            catchError(error,next)
        }
    }

    async  getUpcomingEvent(id: string,limit:number,offset:number, next: Next): Promise<Ievents[] | undefined> {
        try{
            const events = await getUpcomingEvent(id,limit,offset,this.eventRepository)
            return events
        }catch(error){
            catchError(error,next)
        }
    }

    async  changeStatus(eventStatus: string, eventId: string,organizerId:string,next:Next): Promise<Ievents[] | undefined> {
        try{
              const events = await changeStatus(eventStatus,eventId,organizerId,this.eventRepository)
              return events
        }catch(error){
            catchError(error,next)
        }
    }

    async  cancelEvent(eventId: string, organizerId: string, next: NextFunction): Promise<Ievents[] | undefined> {
        try{
            const events = await cancelEvent(eventId,organizerId,this.eventRepository)
            return events
      }catch(error){
          catchError(error,next)
      }
    }

    async  getEventPost(organizerId: string, next: NextFunction): Promise<IeventPost[] | undefined> {
        try{
           const eventPosts = await eventPostsById(organizerId,this.eventPostRepository)
           return eventPosts
        }catch(error){
            catchError(error,next)
        }
    }

    async updatePost(formData: IeventPost,id:string, next: NextFunction): Promise<any> {
        try{
            console.log(" ------------in the use case------",formData,"and the id",id)
          const eventPost = await updateEventPost(formData,id,this.eventPostRepository)
          return eventPost
        }catch(error){
            catchError(error,next)
        }
    }

    async  getAllBookings(eventId: string, next: NextFunction): Promise<any> {
        try{
            console.log(" enteid ",eventId)
            const bookings = await getAllbookings(eventId,this.bookingRepository)
            return bookings
        }catch(error){
            catchError(error,next)
        }
    }

    async  getAllRequests(id: string, next: Next): Promise<Irequest [] | undefined> {
        try{
             const AllRequests = await getAllRequests(id,this.requestRepository)
             return AllRequests
        }catch(error){
             catchError(error,next)
        }
    }

    async  getRequestDetails(id: string, next: NextFunction): Promise<Irequest | undefined> {
        try{
            const request = await getRequestDetails(id,this.requestRepository)
            return request
        }catch(error){
           catchError(error,next)
        }
    }

    async  approveRequest(id: string, next: NextFunction): Promise<{ success: boolean , message: string; } | undefined> {
        try{
             const approved = await approveRequest(id,this.requestRepository)
             return approved
        }catch(error){
            catchError(error,next)
        }
    }

    async  rejectRequest(id: string, next: NextFunction): Promise<{ success: boolean ,  message: string; } | undefined> {
        try{
            const rejected = await rejectRequest(id,this.requestRepository)
             return rejected
        }catch(error){
            catchError(error,next)
        }
    }
   

    async  requestEventCreation(data: Irequest,id:string, next: NextFunction): Promise<{ success: boolean; message: string; } | undefined> {
        try{ 
             console.log(" coming----$&&%^%#@&%!&@%#&!%&#%!@#*!*@#*!*@#^#*!@#*&!*#!@#*!")
            console.log("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- the data------------",data)
            const result =  await requestEventCreation(data,id,this.eventRepository,this.requestRepository)
            return  result
        }catch(error){
            catchError(error,next)
        }
    }

    async  getUserList(id: string, next: NextFunction): Promise<any> {
        try{
           const getList = await getUserList(id,this.organizerRepository,this.userRepository,this.conversationRepository)
           return getList
        }catch(error){
            catchError(error,next)
        }
    }
    
    async  postCreation(data: Ipost, next: NextFunction): Promise<{ success: boolean; message: string; } | undefined> {
        try{
           const createPost = await postCreation(data,this.postRepository)
           return createPost
        }catch(error){
            catchError(error,next)
        }
    }

    async  postUpdation(postId:string,data: Ipost, next: NextFunction): Promise<{ success: boolean; message: string; } | undefined> {
        try{
           const updation = await updatePosts(postId,data,this.postRepository)
           return updation
        }catch(error){
            catchError(error,next)
        }
    }

    async  deletePost(postId: string, next: NextFunction): Promise<{ success: boolean; message: string; } | undefined> {
        try{
            const deleted = await deletePost(postId,this.postRepository )
            return deleted
        }catch(error){
            catchError(error,next)
        }
    }

    async  getAllposts(organizerId: string, next: NextFunction): Promise<any> {
        try{
            const getAllposts = await postFetching(organizerId,this.postRepository)
             console.log(" in the usecase ",getAllposts)
            return getAllposts
        }catch(error){
            catchError(error,next)
        }
    }

    async  getDashboardData(organizerId: string, next: NextFunction): Promise<any> {
        try{
           const data = await getData(organizerId,this.eventRepository,this.eventPostRepository)
           console.log(" the data that getting ",data)
           return data
        }catch(error){
            catchError(error,next)
        }
    }

    async  getRevenue(organizerId: string,next:Next): Promise<{ year: string; month: string; revenue: number; }[] | undefined> {
        try{
            const data = await revenue(organizerId,this.eventRepository)
             console.log(" usecasee",data)
            return data
        }catch(error){
             catchError(error,next)
        }
    }

     async getEventGraph(organizerId: string, next: NextFunction): Promise<{ year: string; month: string; event: number; }[] | undefined> {
        try{
            const data = await  eventGraph(organizerId,this.eventRepository)
            return data
        }catch(error){
           catchError(error,next)
        }
    }
  
    

}