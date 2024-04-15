import { IuserRepository } from "../../interface/repositoryInterface/userRepository"


export const uploadProfile= async(id : string ,image:string,userRepository:IuserRepository ):Promise<boolean> =>{
    try{
        const result = await userRepository.uploadProfilePicture(id,image)
        console.log(" the resul tin the use case")
        return result? true: false
    }catch(error){
        throw error
    }
}