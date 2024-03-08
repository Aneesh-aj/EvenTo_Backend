import { Iuser } from "../../../entities/user";

export interface IuserRepository{
    createUser(newUser:Iuser) : Promise < Iuser>
    findbyEmail(email:string) : Promise < Iuser | void>
    singup(email:string) :Promise <string>
    getAllusers():Promise<string>
    blockUser(id:string):Promise<any>
}