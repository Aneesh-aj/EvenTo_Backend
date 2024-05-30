import { Irequest, IrequestFormData } from "../../../entities/request";

export interface IrequestRepository{
    createRequest(data:IrequestFormData):Promise<any>
    getAllReqeuests(id:string):Promise<Irequest [] | undefined>
    getDetails(id:string):Promise<Irequest | undefined>
    approve(id:string):Promise<{success:boolean,message:string} | undefined>
    reject(id:string):Promise<{success:boolean,message:string} | undefined>
    updateStatus(id:string):Promise<Irequest | undefined>

}