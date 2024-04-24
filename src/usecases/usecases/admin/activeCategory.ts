import { IeventCategory } from "../../../entities/eventCategory";
import { IcategoryRepository } from "../../interface/repositoryInterface/categoryRepository";

export const activeCategory = async(id:string,categoryReopository:IcategoryRepository):Promise<IeventCategory[] | undefined>=>{
    try{
         const activeCategorys = await categoryReopository.activeCategory(id)
         return activeCategorys
    }catch(error){
        throw error
    }
}