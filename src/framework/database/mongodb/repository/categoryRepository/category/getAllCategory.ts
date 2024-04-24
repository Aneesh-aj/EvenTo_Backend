import { IeventCategory } from "../../../../../../entities/eventCategory";
import categoryModel from "../../../model/eventCategory";


export const getAllCategory = async():Promise <IeventCategory[] | undefined>=>{
    try{
        const allCategory = await categoryModel.find({delete:false})
        return allCategory ? allCategory : undefined 
    }catch(error){
        throw error
    }
}