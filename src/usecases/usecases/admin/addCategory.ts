import { IeventCategory } from "../../../entities/eventCategory";
import { IcategoryRepository } from "../../interface/repositoryInterface/categoryRepository";



export const addCategory = async (category:string,categoryReopository:IcategoryRepository):Promise <IeventCategory[] | undefined>=>{
    try{
      const addedCategory = await categoryReopository.addCategory(category)
      if(!addedCategory){
          return addedCategory
      }
      const allCategory = await categoryReopository.getAllCategory()
      return  allCategory
    }catch(error){
        throw error
    }
}