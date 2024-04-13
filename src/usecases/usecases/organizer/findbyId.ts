import { Iorganizer } from "../../../entities/organizer"
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository"



export const findbyId = async(id:string,organizerRepository:IorganizerRepository):Promise<Iorganizer | null>=>{
    try{
         console.log("in file usece")
         const result =  await organizerRepository.findbyId(id)
         console.log("reuslt of file use",result)
         return result ? result : null
    }catch(error){
        throw error
    }
}