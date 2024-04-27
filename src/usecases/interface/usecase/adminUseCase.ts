import { IeventCategory } from "../../../entities/eventCategory";
import { Iorganizer } from "../../../entities/organizer";
import { Next } from "../../../framework/types/serverPackageTypes";


export interface IadminUsecase{
     login({email,password}:{email:string,password:string},next:Next) : Promise < any | null>
     getRequests(next:Next): Promise <any | void>
     getDetails(id:string,next:Next): Promise < any | void>
     approve(id:string,next:Next):Promise <any | void>
     reject(id:string,next:Next):Promise <any | void>
     getAllusers(next:Next):Promise <any | void>
     getAllorganizers(next:Next):Promise<any | void>
     blockUsers(id:string,next:Next):Promise <any>
     blockOrganizer(id:string,next:Next):Promise <any>
     addCategory(category:string,next:Next):Promise<IeventCategory[] | undefined> 
     deleteCategory(id:string,next:Next):Promise<IeventCategory[] | undefined>
     getAllCategory(next:Next):Promise<IeventCategory[] | undefined>
     activeCategory(id:string,next:Next):Promise<IeventCategory[] | undefined>
     editCategory(id:string,category:string,next:Next):Promise<IeventCategory[] | {success:boolean,message:string } | undefined>
     
}