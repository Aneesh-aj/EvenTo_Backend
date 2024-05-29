import { Irequest } from "../../../entities/request";
import { IrequestRepository } from "../../interface/repositoryInterface/requestRepository";


export const getAllRequests = async(id:string,requestRepository:IrequestRepository):Promise<Irequest [] | undefined>=>{
    try{
         const AllRequests = await requestRepository.getAllReqeuests(id)
         return AllRequests
    }catch(error){
        throw error
    }
}