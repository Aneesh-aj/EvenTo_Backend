import { Iorganizer } from "../../../entities/organizer";
import { Next } from "../../../framework/types/serverPackageTypes";


export interface IadminUsecase{
     login({email,password}:{email:string,password:string},next:Next) : Promise < any>
     getRequests(next:Next): Promise <any | void>
     getDetails(id:string,next:Next): Promise < any | void>
     approve(id:string,next:Next):Promise <any | void>
     reject(id:string,next:Next):Promise <any | void>
     getAllusers(next:Next):Promise <any | void>
     getAllorganizers(next:Next):Promise<any | void>
     blockUsers(id:string,next:Next):Promise <any>
     blockOrganizer(id:string,next:Next):Promise <any>

}