import { Iorganizer, IorganizerAndAddress } from "../../../entities/organizer"
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository"



export const allDetailsById = async(id:string,organizerRepository:IorganizerRepository):Promise<IorganizerAndAddress | undefined>=>{
    try{
         console.log("in file usece")
         const result =  await organizerRepository.getDetailsById(id)
         console.log("reuslt of file use",result)
         return result ? result : undefined
    }catch(error){
        throw error
    }
}