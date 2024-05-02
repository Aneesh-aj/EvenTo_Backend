import organizerModel from "../../model/organizer";

import { Iorganizer, IorganizerAndAddress, IprofileFormData } from "../../../../../entities/organizer";
import { addAddress, approve, block, createOrganizer, findbyEmail, getAll, getAllorganizer, getDetails, reject,approveChecking, changeStatus, uploadBackground, findbyId, uploadProfile, getAllorganizerAndaddress, allDetailsById, editOrganizer, editAddress } from './organizer/index'
import { IorganizerRepository } from "../../../../../usecases/interface/repositoryInterface/organizerRepository";
import { Iaddress } from "../../../../../entities/address";
import addressModel from "../../model/address";
import { error } from "console";

export class OrganizerRepository implements IorganizerRepository {

    constructor(private organizerModels: typeof organizerModel) { }

    async createAddress(newaddres: Iaddress): Promise<void | Iaddress> {
        try {
            return await addAddress(newaddres, addressModel)
        } catch (error) { throw error }
    }
    async createOrganizer(newUser: Iorganizer): Promise<Iorganizer | void> {
        try {
            return await createOrganizer(newUser, this.organizerModels)
        } catch (error) {
            throw error
        }
    }
    async findbyEmail(email: string): Promise<Iorganizer | null> {
        try {
            return await findbyEmail(email, organizerModel)
        } catch (error) {
            throw error
        }
    }
    // async organizerLogin(email: string, password: string): Promise<string | void> {
    //     try {
    //         return await organizerLogin(email, password, organizerModel)
    //     } catch (error) {
    //         throw error
    //     }
    // }

    async getAll(): Promise<any | void> {
        try {
            return await getAll(organizerModel)
        } catch (error) {
            throw error
        }
    }

    async getDetails(id: string): Promise<any> {
        try {
            return await getDetails(id, organizerModel)
        } catch (error) {
            throw error
        }
    }

    async approve(id: string): Promise<any> {
        try {
            return await approve(id, organizerModel)
        } catch (error) {
            throw error
        }
    }

    async reject(id: string): Promise<any> {
        try{
            return await reject(id, organizerModel)
        }catch(error){
            throw error
        }
    }

    async getAllorganizer(): Promise<any> {
        try{
            return await getAllorganizer(organizerModel)
        }catch(error){
            throw error
        }
    }

    async blockOrganizer(id: string): Promise<any> {
        try{
            return await block(id, organizerModel)
        }catch(error){
            throw error
        }
    }

    async  approveChecking(id: string): Promise<boolean> {
        try{
            const result =  await approveChecking(id)
            console.log("the result",result)
            if(result){
                return true
            }else{
                return false
            }
        }catch(error){
            throw error
        }
    }
    async  changeStatus(id: string): Promise<Iorganizer | null> {
        return await changeStatus(id)
    }

    async  uploadBackground(id: string, image: string): Promise<string | null> {
        console.log("on the resp",id , image)
        return await uploadBackground(id,image)
    }
    
    async  findbyId(id: string): Promise<Iorganizer | null> {
         return await findbyId(id)
    }
    
    async  uploadProfile(id: string, image: string): Promise<string | null> {
        return await uploadProfile(id,image)

    }
    async getAllorganizerAndaddress(): Promise<IorganizerAndAddress[] | undefined> {
        return await getAllorganizerAndaddress()
    }

    async  getDetailsById(id: string): Promise<IorganizerAndAddress | undefined> {
        return await allDetailsById(id)
    }

    async   editOrganizer(id: string, user: IprofileFormData): Promise<void> {
         return await editOrganizer(id,user)
    }

    async  editAddress(id: string, address: IprofileFormData): Promise<void> {
        return await editAddress(id,address)
        
    }


}