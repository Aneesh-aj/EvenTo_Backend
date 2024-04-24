import { IeventCategory } from "../../../entities/eventCategory";
import { IcategoryRepository } from "../../interface/repositoryInterface/categoryRepository";



export const getAllCategory = async(categoryReopository:IcategoryRepository):Promise<IeventCategory[] | undefined>=>{
    try{
        const getallCategegory = await categoryReopository.getAllCategory()
        return getallCategegory ? getallCategegory : undefined                                              
    }catch(error){
        throw error
    }
}