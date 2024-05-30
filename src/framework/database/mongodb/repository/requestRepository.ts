import { Irequest, IrequestFormData } from "../../../../entities/request";
import { IrequestRepository } from "../../../../usecases/interface/repositoryInterface/requestRepository";
import requestModel from "../model/request";



export class RequestRepository implements IrequestRepository{
      
     async createRequest(data:IrequestFormData){
         try{
             const request = await requestModel.create(data) 
             console.log(" the request -----",request)
             return  request ?  {success:true,message:"Request Sended Successfully"} : {success:false,message:"error While Reqeust Sending"}
         }catch(error){
             throw error
         }
     }

     async getAllReqeuests(id: string): Promise<Irequest [] | undefined> {
         try{
             const AllRequests = await requestModel.find({organizerId:id})
              console.log("Allllll",AllRequests)
             return AllRequests ? AllRequests : undefined
         }catch(error){
             throw error
         }   
     }

     async  getDetails(id: string): Promise<Irequest | undefined> {
         try{
             const request = await requestModel.findById(id)
             console.log(" the reequest details",request)
             return request ? request : undefined
         }catch(error){
            throw error
         }
     }

     async  approve(id: string): Promise<{ success: boolean; message: string; } | undefined> {
         try{
             const approved = await requestModel.findById(id)
             if(approved?.status){

                 approved.status = "Approved"
                 approved?.save() 
             }
             return approved?.status ==="Approved" ? {success:true,message:"Approved successfully"} : {success:false,message:"Error while approving"}
         }catch(error){
            throw error
         }
     }

     async  reject(id: string): Promise<{ success: boolean; message: string; } | undefined> {
        try{
            const approved = await requestModel.findById(id)
            if(approved?.status){

                approved.status = "Rejected"
                approved?.save() 
            }
            return approved?.status ==="Rejected" ? {success:true,message:"Rejected successfully"} : {success:false,message:"Error while Rejecting"}
        }catch(error){
           throw error
        }
    }

    async  updateStatus(id: string): Promise<Irequest | undefined> {
        try{
            const request = await requestModel.findByIdAndUpdate(id,{status:"EventCreated"})
            return request ? request : undefined

        }catch(error){
            throw error
        }
    }
}