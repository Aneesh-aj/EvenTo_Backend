import categoryModel from "../../../model/eventCategory"


export const editCategory = async(id:string,category:string):Promise<{success:boolean,message:string}>=>{
     try{
              const exist = await categoryModel.findById(id)
              if(!exist){
                 return {success:false,message:"Invalid category Id"}
              }
              const allCategory = await categoryModel.find({category:category})
              if(allCategory){
                  return {success:false,message:"Name already exists"}
              }
              
             exist.category = category
             exist.save()
             return {success:true,message:"value updated"}
              
     }catch(error){
        throw error
     }
}