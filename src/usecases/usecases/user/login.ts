import { IuserRepository } from "../../interface/repositoryInterface/userRepository";

import { Iuserjwt } from "../../interface/service/jwt";

export const login = async (userRepository:IuserRepository,jwt:Iuserjwt,email:string,password:string) : Promise <object | void >=>{
      const checked  = await userRepository.findbyEmail(email)
        console.log(" the checked",checked)
        
        if(checked){
        const obj={_id:checked._id,name:checked.name,email:checked.email,password:checked.password}
        let token = await jwt.createVerificationJWT(obj)
        console.log(" the token", token)
        let id = checked?._id
        console.log(" the id ",id)
        if(id){
          let role = "user"
          let Tokens  = await jwt.createAccessAndRefreshToken(id as string ,role as string)
          console.log("acessAndRef",Tokens )
          return Tokens
        }
      }
}