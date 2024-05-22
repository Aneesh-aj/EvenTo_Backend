import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Ihashpassword } from "../../interface/service/hashPassword";


export const changePassword = async(password:string,email:string,userRepoistory:IuserRepository,hashing:Ihashpassword):Promise<{success:boolean,message:string} | undefined>=>{
    try{
        const hashedPassword = await hashing.createHash(password)
       const changePassword = await userRepoistory.changePassword(email,hashedPassword)
       return {success:true,message:"password changed"}
    }catch(error){
        throw error
    }
}