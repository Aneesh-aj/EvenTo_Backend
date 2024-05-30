import { IrequestRepository } from "../../interface/repositoryInterface/requestRepository";

export const rejectRequest = async(id:string,requestRepository:IrequestRepository):Promise<{success:boolean,message:string} | undefined>=>{
    try{
          const rejected = await requestRepository.reject(id)
          return rejected
    }catch(error){
         throw error
    }
}