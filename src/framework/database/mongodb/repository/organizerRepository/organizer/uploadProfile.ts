
import organizerModel from "../../../model/organizer"


export const uploadProfile= async (id : string, image:string)=>{
     console.log("in the repo",image)
    const organizer = await organizerModel.findByIdAndUpdate(id,{profielImage:image})
     console.log(" the newe organizer data which is fetched",organizer)
    if(organizer?.profielImage){
         console.log(" comiing in the if")
         return organizer.profielImage
    }else{
         return null
    }
}