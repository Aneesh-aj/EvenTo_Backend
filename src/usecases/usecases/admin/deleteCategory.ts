import { IeventCategory } from "../../../entities/eventCategory"
import { IcategoryRepository } from "../../interface/repositoryInterface/categoryRepository"



export const deleteCategory = async(id:string,categoryReopository:IcategoryRepository):Promise<IeventCategory[] | undefined>=>{
    try{
        const deleteCategory = await categoryReopository.deleteCategory(id)
        return deleteCategory
    }catch(error){
        throw error
    }
}