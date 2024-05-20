import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository"



export const uploadProfile= async(id : string ,image:string,organizerRepository:IorganizerRepository ):Promise<string | null> =>{
    try{
        const result = await organizerRepository.uploadProfile(id,image)
        console.log("=------------ the resul tin the use case--------------------------",result)
        return result
    }catch(error){
        throw error
    }
}