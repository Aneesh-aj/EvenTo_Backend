import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";


export const reject= async (organizerRepository:IorganizerRepository,id:string)=>{
    console.log(" it on the usecaseddd")
   let reslt = organizerRepository.reject(id)
   return reslt
}