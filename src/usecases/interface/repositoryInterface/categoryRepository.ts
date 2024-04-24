import { IeventCategory } from "../../../entities/eventCategory";


export interface IcategoryRepository{
     addCategory(category:string):Promise <IeventCategory| undefined>
     getAllCategory():Promise<IeventCategory [] |undefined>
     deleteCategory(id:string):Promise<IeventCategory[] | undefined >
     activeCategory(id:string):Promise<IeventCategory [] | undefined>
}