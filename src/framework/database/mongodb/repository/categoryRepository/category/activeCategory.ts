import { IeventCategory } from "../../../../../../entities/eventCategory";
import categoryModel from "../../../model/eventCategory";


export const activeCategory = async(id:string):Promise<IeventCategory[] | undefined>=>{
     try{
        const category = await categoryModel.findById(id)
         if(category){
             category.active ? category.active = false : category.active = true
             category.save()
         }
        const allCategory = await categoryModel.find({delete:false})
        return allCategory ? allCategory : undefined
     }catch(error){
        throw error
     }
}