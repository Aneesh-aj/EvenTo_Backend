import { Iuser } from "../../../entities/user"
import { Next } from "../../../framework/types/serverPackageTypes"
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository"
import { IuserRepository } from "../../interface/repositoryInterface/userRepository"
import { Ihashpassword } from "../../interface/service/hashPassword"
import { Ijwt } from "../../interface/service/jwt"
import { catchError } from "../../middleares/catchError"
import ErrorHandler from "../../middleares/errorHandler"



export const createUser= async (token:string,otp:string,otpRepository:IotpRepository,userRepository:IuserRepository,hashPassword:Ihashpassword,jwt:Ijwt,next : Next):Promise <Iuser | void>=>{  
     
    // console.log("inside the creater",newUser)
    try{
        console.log("next is otp",otp)
    
        let decode = (await jwt.verifyJwt(token)) as Iuser
        console.log(" the userssss", decode.email, decode.name,decode.password)
        if(!decode){
            return next(new ErrorHandler(400,"token has expired,register again"))
        }
         
    
        const result = await otpRepository.findAndDeleteUser(decode.email,otp)
          console.log("the result of the otp",result)
        if(!result){
            return next(new ErrorHandler(400,"verification code mismatched"))
        }
         
        const newUser = await userRepository.createUser(decode)
        console.log("createding user",newUser)
        return newUser
    
    
    }catch(error){
        throw error
    }


    // const isTrue = await otpRepository.findOtp(newUser.email)

    // if(isTrue){
    //     console.log("inside if")
    //     if(isTrue.otp === otp){
    //         console.log("inside another if")
    //         let password = await hashPassword.createHash(newUser.password)
 
    //         let user = await userRepository.createUser({name:newUser.name,email:newUser.email,password})
    //         console.log(user)
    //         console.log("okkkkkkkkkkkkk")
    //         return user?._id
    //     }
    // }else{
    //     return "invalid otp"
    // }



      
}