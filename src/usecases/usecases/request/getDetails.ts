import { Irequest } from "../../../entities/request";
import { IrequestRepository } from "../../interface/repositoryInterface/requestRepository";

export const getRequestDetails = async(id:string,requestRepository:IrequestRepository):Promise<Irequest | undefined>=>{
    try{    
        const request = await requestRepository.getDetails(id)
        return request
    }catch(error){
        throw error
    }
}