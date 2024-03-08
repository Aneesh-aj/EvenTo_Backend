import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";


export const getRequests= async (organizerRepository:IorganizerRepository)=>{
    console.log(" it on the usecaseddd")
   let reslt = organizerRepository.getAll()
   return reslt
}