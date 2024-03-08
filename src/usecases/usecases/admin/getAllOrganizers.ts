import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";


export const getAllorganizers= async (organizerRepository:IorganizerRepository)=>{
    console.log(" it on the usecaseddd")
   let reslt = organizerRepository.getAllorganizer()
   return reslt
}