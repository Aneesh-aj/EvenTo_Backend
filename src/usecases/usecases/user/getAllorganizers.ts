import { Iorganizer, IorganizerAndAddress } from "../../../entities/organizer"
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository"



export const getOrganizers= async(organizerRepository:IorganizerRepository):Promise<IorganizerAndAddress[] | undefined>=>{
   try{
       const allorganizers = await organizerRepository.getAllorganizerAndaddress()
        console.log(" in the usecsase" , allorganizers)
        return allorganizers ? allorganizers: undefined;
   }catch(error){
     throw error
   }
}

