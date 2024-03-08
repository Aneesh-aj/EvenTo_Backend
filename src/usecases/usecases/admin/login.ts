import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { Ihashpassword } from "../../interface/service/hashPassword";
import { Iuserjwt } from "../../interface/service/jwt";



export async function login(email:string,password:string,hashpassword:Ihashpassword,adminRepository:IadminRepository,jwt:Iuserjwt){
     try {
        console.log(" in  the login use",email)
        let admin = await adminRepository.findAdmin(email)
     if(admin){
        let compare = await hashpassword.comparePassword(password,admin?.password)
        console.log(" password compareing ",compare)
        if(compare){
            let role = "admin"
            let id = admin._id
            let token = await jwt.createAccessAndRefreshToken(id as string, role as string) 
            console.log(" toekn created",token)
            return token
        }
     }else{
        return
     }
     } catch (error) {
        throw error
     }
  }