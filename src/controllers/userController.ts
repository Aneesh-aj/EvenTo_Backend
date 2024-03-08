import {Req,Res,Next} from "../frameWork/types/serverPackageTypes"
import { IuserUseCase } from "../usecases/interface/usecase/userUseCase"
import { accessTokenOptions,refreshTokenOptions } from "./middleware/Tokens"



export class UserController{
     
    private userUseCase : IuserUseCase
    
    constructor(userUseCase: IuserUseCase,){
        this.userUseCase = userUseCase
        
    }

    async signup(req:Req, res: Res ,next : Next){
        console.log("the backedn ",req.body.email)
        console.log("whole body",req.body)
        const user = await this.userUseCase.userSignup(req.body.email , next)
        console.log(" working end")
        res.json("ok")
         
    }


    async createUser(req:Req, res : Res ,next:Next){
        console.log("int the createuser controller")
        const user = await this.userUseCase.createUser({name:req.body.name,email:req.body.email,password:req.body.password},req.body.otp,next)
          console.log("at the end of the uer",user)
          res.send('/user/profile')
    }

    async organizerLogin(req:Req, res : Res, next : Next){
         console.log("org login controller")
         const user  = await  this.userUseCase.login(req.body.email, req.body.passsword,next)
         console.log(" at the end")
         console.log(
            "hte user",user
         )
         res.cookie("accesToken",user?.accessToken,accessTokenOptions)
        //  res.cookie("refreshToken",user?.refreshToken,refreshTokenOptions)
         res.cookie("role",'user')
         if(user){
             console.log(" usersss",user.accessToken)
         }
         res.status(200).json({token:user?.accessToken,role:'user'})
    }
}