import { ObjectId } from "mongodb";

export interface Iconversation{
    participants:[string,string],
    messages:[ObjectId]
}