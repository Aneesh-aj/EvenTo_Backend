import { IeventPost } from "../../../../../../entities/eventPost";
import eventPostModel from "../../../model/eventPost";



export const eventPostCreation = async (data:IeventPost,categoryId:string):Promise<IeventPost | undefined>=>{
    try{

        console.log(" in the modell")
        
        const event = await eventPostModel.create({
             eventId:data.eventId,
             organizerId: data.organizerId,
             image:data.image,
             title:data.title,
             subTitle:data.subTitle,
             entryFormId:data.entryFormId,
             seatArrangment:data.seatArrangment,
             categoryId:categoryId
        })
         console.log(" here the eevent sss",event)
        return event ? event : undefined

    }catch(error){
         console.log(" there the errorrsss")
        throw error
    }
}