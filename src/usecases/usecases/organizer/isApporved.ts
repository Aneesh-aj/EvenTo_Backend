import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";


export async function approvalChecking(id:string,organizerRepository:IorganizerRepository):Promise<boolean>{
   const result = await organizerRepository.approveChecking(id)
   return result
}