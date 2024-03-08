import organizerModel from "../../model/organizer";

import { Iorganizer } from "../../../../entities/organizer";
import {addAddress, createOrganizer, findbyEmail , organizerLogin} from './organizer/index'

import { IorganizerRepository } from "../../../../usecases/interface/repositoryInterface/organizerRepository";
import { Iaddress } from "../../../../entities/address";
import addressModel from "../../model/address";
import { getAll } from "./organizer/getall";
import { getDetails } from "./organizer/getDetails";
import { approve } from "./organizer/approvelAccept";
import { reject } from "./organizer/approvelReject";
import { getAllorganizer } from "./organizer/getallOrgnaizer";
import { block } from "./organizer/block";


export class OrganizerRepository implements IorganizerRepository{
    constructor(private organizerModels: typeof organizerModel){
    
    }
   async  createAddress(newaddres: Iaddress): Promise<void | Iaddress> {
        return await addAddress(newaddres,addressModel)
    }
   async  createOrganizer(newUser: Iorganizer): Promise<Iorganizer | void> {
        return await createOrganizer(newUser, this.organizerModels)
    }

    async  findbyEmail(email: string): Promise< string | void> {
        return await findbyEmail(email,organizerModel)
    }
    async  organizerLogin(email: string, password: string): Promise<string | void> {
           return await organizerLogin(email,password,organizerModel)
    }

   async getAll(): Promise<any | void> {
        return await getAll(organizerModel)
    }
    async  getDetails(id: string): Promise<any> {
        return await getDetails(id,organizerModel)
    }

   async   approve(id: string): Promise<any> {
        return await approve(id,organizerModel)
    }

    async  reject(id: string): Promise<any> {
        return await reject(id,organizerModel)
    }
     async getAllorganizer(): Promise<any> {
         return await getAllorganizer(organizerModel)
     }
    
     async  blockOrganizer(id: string): Promise<any> {
        console.log("Inside the repsssso=========================================================================================================================================================");

         return await  block(id,organizerModel)
     }
}