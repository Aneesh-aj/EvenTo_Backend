import { IrequestFormData } from "../../../../entities/request";
import { IrequestRepository } from "../../../../usecases/interface/repositoryInterface/requestRepository";
import requestModel from "../model/request";



export class RequestRepository implements IrequestRepository{
      
     async createRequest(data:IrequestFormData){
         try{
             const request = await requestModel.create(data) 
             console.log(" the request -----",request)
             return request
         }catch(error){
             throw error
         }
     }
}