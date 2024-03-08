import { Iuser } from "../../../entities/user"
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository"
import { IuserRepository } from "../../interface/repositoryInterface/userRepository"
import { Ihashpassword } from "../../interface/service/hashPassword"
import { Iuserjwt } from "../../interface/service/jwt"



export const createUser= async (newUser:Iuser,otp:string,otpRepository:IotpRepository,userRepository:IuserRepository,hashPassword:Ihashpassword,jwt:Iuserjwt):Promise <string | void>=>{  
     
    console.log("inside the creater",newUser)
    console.log("next is otp",otp)

    const isTrue = await otpRepository.findOtp(newUser.email)

    if(isTrue){
        console.log("inside if")
        if(isTrue.otp === otp){
            console.log("inside another if")
            let password = await hashPassword.createHash(newUser.password)
 
            let user = await userRepository.createUser({name:newUser.name,email:newUser.email,password})
            console.log(user)
            console.log("okkkkkkkkkkkkk")
            return user?._id
        }
    }else{
        return "invalid otp"
    }



     return 
}