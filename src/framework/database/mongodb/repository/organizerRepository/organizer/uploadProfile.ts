
import organizerModel from "../../../model/organizer"


export const uploadProfile= async (id : string, image:string)=>{
     console.log("in the repo",image)
    const organizer = await organizerModel.findByIdAndUpdate(id,{profileImage:image})
     console.log(" the newe organizer data which is fetched",organizer)
    if(organizer?.profileImage){
         console.log(" comiing in the if")
         return organizer.profileImage
    }else{
         return null
    }
}