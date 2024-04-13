import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository"



export const uploadBackground= async(id : string ,image:string,organizerRepository:IorganizerRepository ):Promise<string | null> =>{
    try{
        const result = await organizerRepository.uploadBackground(id,image)
        console.log(" the resul tin the use case")
        return result
    }catch(error){
        throw error
    }
}