import { IeventCategory } from "../../../../../../entities/eventCategory";
import categoryModel from "../../../model/eventCategory";


export const deleteCategory = async (id:string):Promise < IeventCategory[] | undefined>=>{
    try{
         const category =  await categoryModel.findByIdAndUpdate(id,{delete:true})
         const getAllCategory = await categoryModel.find({delete:false})
         return getAllCategory ? getAllCategory:undefined

    }catch(error){
        throw error
    }
}