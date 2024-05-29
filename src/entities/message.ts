import { ObjectId } from "mongodb";

export interface Imessage{
     _id?:ObjectId  ,
     senderId:ObjectId;
     receiverId:ObjectId,
     message:string,
     media:string
}