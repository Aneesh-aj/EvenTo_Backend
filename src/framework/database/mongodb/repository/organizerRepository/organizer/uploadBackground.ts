import organizerModel from "../../../model/organizer"


export const uploadBackground= async (id : string, image:string)=>{
     console.log("in the repo",image)
    const organizer = await organizerModel.findByIdAndUpdate(id,{backgroundImage:image})
     console.log(" the newe organizer data which is fetched",organizer)
     if(organizer?.backgroundImage === image)console.log(true)
    if(organizer?.backgroundImage){
         console.log(" comiing in the if")
         return organizer.backgroundImage
    }else{
         return null
    }
}