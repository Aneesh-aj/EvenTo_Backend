import categoryModel from "../../../model/eventCategory"


export const editCategory = async(id:string,category:string):Promise<{success:boolean,message:string}>=>{
     try{
              const exist = await categoryModel.findById(id)
              if(!exist){
                 return {success:false,message:"Invalid category Id"}
              }
              const allCategory = await categoryModel.find({category:category})

              console.log(" the similar one",allCategory)
              if(allCategory.length >0){
                  return {success:false,message:"Name already exists"}
              }
              
              const updated = await categoryModel.updateOne({_id:id},{category:category },{upsert:true})

            //  exist.category = category
            //  exist.save()
             console.log(" after exitest",updated)
             return {success:true,message:"value updated"}
              
     }catch(error){
        throw error
     }
}