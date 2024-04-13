import { Iaddress } from "../../../entities/address";
import { Iorganizer } from "../../../entities/organizer";

export interface IorganizerRepository{
    createOrganizer(newUser:Iorganizer): Promise < Iorganizer | void>
    createAddress(newaddres:Iaddress):Promise <any>
    findbyEmail(email:string):Promise < Iorganizer | null>
    getAll():Promise<Iorganizer | void  >
    getDetails(id:string) : Promise<any | void>
    approve(id:string):Promise <any | void>
    reject(id:string):Promise <any | void>
    getAllorganizer():Promise <any | void>
    blockOrganizer(id:string) : Promise <any | void>
    approveChecking(id:string):Promise<boolean>
    changeStatus(id:string):Promise<Iorganizer | null>
    uploadBackground(id:string,image:string):Promise<string | null>
    findbyId(id:string):Promise<Iorganizer | null>
    uploadProfile(id:string,image:string):Promise<string | null>


}