import { IeventCategory } from "../../../../../../entities/eventCategory";
import categoryModel from "../../../model/eventCategory";


export const addCategory = async (category:string):Promise<IeventCategory  | undefined>=>{
    try{
        
        const exist = await categoryModel.findOne({category:category})
        if(exist){
            return undefined
        }
        const addedCategory = await categoryModel.create({category:category})


        return addedCategory

    }catch(error){
        throw error
    }
}