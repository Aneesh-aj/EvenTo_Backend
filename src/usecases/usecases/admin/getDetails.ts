import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";


export const getDetails= async (organizerRepository:IorganizerRepository,id:string)=>{
    console.log(" it on the usecaseddd")
   let reslt = organizerRepository.getDetails(id)
   return reslt
}