import organizerModel from "../../../model/organizer"



export const changeStatus= async(id :string)=>{
     try{
         const result = await organizerModel.findByIdAndUpdate(id,{role:"organizer"})
         return result
     }catch(error){
        throw error
     }
}