import { IrequestFormData } from "../../../entities/request";

export interface IrequestRepository{
    createRequest(data:IrequestFormData):Promise<any>
}