import { IeventPost } from "../../../../../../entities/eventPost";
import eventPostModel from "../../../model/eventPost";



export const eventPostCreation = async (data:IeventPost):Promise<IeventPost | undefined>=>{
    try{
        
        const event = await eventPostModel.create(data)
        return event ? event : undefined

    }catch(error){
        throw error
    }
}