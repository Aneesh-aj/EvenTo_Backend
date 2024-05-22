import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { Ihashpassword } from "../../interface/service/hashPassword";
import { Ijwt } from "../../interface/service/jwt";



export async function login(email:string,password:string,hashpassword:Ihashpassword,adminRepository:IadminRepository,jwt:Ijwt){
     try {
        console.log(" in  the login use",email)
        const admin = await adminRepository.findAdmin(email)
      if(!admin)return {message:'Admin not found !!'}
     if(admin){
        const compare = await hashpassword.comparePassword(password,admin?.password)
        console.log(" password compareing ",compare)
        if(compare){
            // const role = "admin"
            const  id = admin._id
            const token = await jwt.createAccessAndRefreshToken(id as string) 
            console.log(" toekn created",token)
            return {admin,token}
        }else{
          return {message:"Invalid password"}
        }
     }else{
        return null
     }
     } catch (error) {
        throw error
     }
  }