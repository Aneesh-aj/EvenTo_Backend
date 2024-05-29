import { IrequestFormData } from "../../../entities/request"
import { IrequestRepository } from "../../interface/repositoryInterface/requestRepository"


export const createRequest = async(data:IrequestFormData,requestRepository:IrequestRepository):Promise<any>=>{
    try{
           console.log(" commiggg")
           const request = await requestRepository.createRequest(data)
          return request
    }catch(error){
        throw error
    }
}