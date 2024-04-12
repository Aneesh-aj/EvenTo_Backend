import organizerModel from "../../../model/organizer"



export const approveChecking= async(id:string)=>{
    try{
        console.log("id",id)
        const organizer =  await organizerModel.findById({_id:id})
        console.log(" the organizer",organizer)
        return organizer?.approved
    }catch(error){
        throw error
    }
}