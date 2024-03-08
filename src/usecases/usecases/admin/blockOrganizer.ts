import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";


export const blockOrganizer= async (organizerRepository:IorganizerRepository,id:string)=>{
    console.log(" it on the usecaseddd")
    console.log("Inside the repo=========================================================================================================================================================");

   let reslt = organizerRepository.blockOrganizer(id)
   return reslt
}