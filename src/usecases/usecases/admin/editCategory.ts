import { IeventCategory } from "../../../entities/eventCategory";
import { IcategoryRepository } from "../../interface/repositoryInterface/categoryRepository";


export const editCategory = async(id:string,category:string,categoryReopository:IcategoryRepository):Promise<IeventCategory[]| {success:boolean,message:string} | undefined>=>{
    try{
        const editedCategory = await categoryReopository.editCategory(id,category)
        if(editedCategory.success == false){
            return editedCategory
        }
        const allCategory = await categoryReopository.getAllCategory()
        console.log(" the all categorys",allCategory)
        return allCategory ? allCategory : undefined

    }catch(error){
        throw error
    }
}