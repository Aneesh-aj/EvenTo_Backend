import { Iaddress } from "../../../entities/address";
import { booking } from "../../../entities/booking";
import { Ievents } from "../../../entities/event";
import { IeventCategory } from "../../../entities/eventCategory";
import { IeventPost } from "../../../entities/eventPost";
import { Iorganizer, IorganizerAndAddress } from "../../../entities/organizer";
import { Iuser } from "../../../entities/user";

import { Next,Res,Req } from "../../../framework/types/serverPackageTypes";
import { IToken } from "../service/jwt";

export interface IuserUseCase{
    userSignup( user: Iuser,next : Next) : Promise < string | void >
    login(email:string,password:string,next:Next) : Promise < {user:Iuser, tokens:IToken} | void> 
    createUser(token:string , otp:string, next: Next) : Promise <Iuser| void>
    getUser(id:string,next:Next):Promise<{user:Iuser,address:Iaddress}| {user:Iuser} | undefined>
    editProfile(id:string,formData:any,next:Next):Promise <{user:Iuser,address:Iaddress} | Iuser | undefined>
    addProfilePicture(id:string,image:string,next:Next):Promise<boolean | undefined>
    resentOtp(email:string,next:Next):Promise<void>
    allOrganizers(next:Next):Promise<IorganizerAndAddress[] | undefined>
    eventPostDetails (id:string,next:Next):Promise<{post:IeventPost,event:Ievents,organizer:{id:string,name:string}} | undefined >
    getSeats(id:string,next:Next):Promise<any | undefined>
    seatBooking(id:string,selectedSeat:[],userId:string,next:Next):Promise < any>
    payment(eventId:string,userId:string,seats:[],amount:string,postId:string,next:Next):Promise<any>
    paymentStatus(req:Req,next:Next):Promise<boolean | undefined>
    booking(bookingData:booking,chargeId:string ,next:Next):Promise<any>
    getAllCategory(next:Next):Promise<IeventCategory[] | undefined>
    allBookings(id:string,next:Next):Promise<any>
}