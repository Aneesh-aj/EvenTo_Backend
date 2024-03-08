import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";


export const approve= async (organizerRepository:IorganizerRepository,id:string)=>{
    console.log(" it on the usecaseddd")
   let reslt = organizerRepository.approve(id)
   return reslt
}