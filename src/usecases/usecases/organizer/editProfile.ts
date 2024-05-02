import { IprofileFormData } from "../../../entities/organizer";
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";


export const profileEdit = async(id:string,formData:IprofileFormData,organizerRepository:IorganizerRepository):Promise<void> =>{
    try{
        const {name,phoneNumber,country,state,city,pinCode,about,eventCategory,email,building} = formData
        const  orgnaizerEdit = await organizerRepository.editOrganizer(id,{name,phoneNumber,about,email,eventCategory})
        const editedAddress = await organizerRepository.editAddress(id,{country,state,city,pinCode,building})

        return 
    }catch(error){
        throw error
    }
}