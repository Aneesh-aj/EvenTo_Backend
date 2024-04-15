import { Iaddress } from "../../../entities/address";
import { Iuser } from "../../../entities/user";

export interface IuserRepository{
    createUser(newUser:Iuser) : Promise < Iuser>
    findbyEmail(email:string) : Promise < Iuser | void>
    singup(email:string) :Promise <string>
    getAllusers():Promise<string>
    blockUser(id:string):Promise<any>
    getUser(id:string):Promise<Iuser | undefined>
    getAddress(id:string):Promise<Iaddress | undefined>
    editUserData(id:string,phoneNumber:string,name:string):Promise < Iuser | undefined>
    editAddress(id:string,country:string,state:string,city:string,pinCode:string):Promise<Iaddress | undefined>
    uploadProfilePicture(id:string,image:string):Promise<boolean>
}