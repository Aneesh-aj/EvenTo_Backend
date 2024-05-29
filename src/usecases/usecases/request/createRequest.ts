import { IrequestFormData } from "../../../entities/request"
import { IrequestRepository } from "../../interface/repositoryInterface/requestRepository"


export const createRequest = async(data:IrequestFormData,requestRepository:IrequestRepository):Promise<any>=>{
    try{
           const request = await requestRepository.createRequest(data)
    }catch(error){
        throw error
    }
}