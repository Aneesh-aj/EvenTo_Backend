import mongoose from "mongoose";

export interface Ipost{
    organizerId:mongoose.Types.ObjectId | string,
    postImage:string,
    description:string,
    likes:object[],
}