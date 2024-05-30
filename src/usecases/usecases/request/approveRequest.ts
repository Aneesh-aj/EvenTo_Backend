import { IrequestRepository } from "../../interface/repositoryInterface/requestRepository";

export const approveRequest = async(id:string,requestRepository:IrequestRepository):Promise<{success:boolean,message:string} | undefined>=>{
    try{
        const approved = await requestRepository.approve(id)
        return approved
    }catch(error){
         throw error
    }
}