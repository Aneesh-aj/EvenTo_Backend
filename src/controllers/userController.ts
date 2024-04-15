import { Req, Res, Next } from "../framework/types/serverPackageTypes"
import { IuserUseCase } from "../usecases/interface/usecase/userUseCase"
import ErrorHandler from "../usecases/middleares/errorHandler"
import { accessTokenOptions, refreshTokenOptions } from "./middleware/Tokens"



export class UserController {

    private userUseCase: IuserUseCase

    constructor(userUseCase: IuserUseCase,) {
        this.userUseCase = userUseCase

    }

    ///////////signup///////////////////////

    async signup(req: Req, res: Res, next: Next) {
        try {
            const Token = await this.userUseCase.userSignup({ name: req.body.name, email: req.body.email, password: req.body.password }, next)
            if(Token){
                res.cookie("verificationToken",Token,{
                    httpOnly:true,
                    sameSite:"strict",
                    expires:new Date(Date.now()+ 30 * 60 * 1000),
                })
                    res.status(200).json({
                     success:true,
                     message:"verification otp has been sent to the mail"
                })
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }

    }
////////////// creating user ///////////////

    async createUser(req: Req, res: Res, next: Next) {
        try{
            console.log("int the createuser controller")
            const token = req.cookies.verificationToken
            console.log("verificaiton token",token)
            const user = await this.userUseCase.createUser(token,req.body.otp, next)
            console.log("at the end of the uer", user)
            if(user){
                res.clearCookie("verificationToken").send(user)
            }
        }catch(error:any){
            console.log("comiiing here the error")
            return next(new ErrorHandler(error.status , error.message))
        }
    }

    async userLogin(req: Req, res: Res, next: Next) {
       try{
        console.log("org login controller",req.body)
        console.log(" passwod",req.body.password)
        const result = await this.userUseCase.login(req.body.email, req.body.password, next)
        console.log(" at the end")
        console.log(
            "hte user", result
        )
        console.log("the access toekn",result?.tokens?.accessToken)
        console.log("the refresh token",result?.tokens?.refreshToken)



        if(result){
            res.cookie("accessToken",result?.tokens?.accessToken,accessTokenOptions)
            res.cookie('refreshToken',result?.tokens?.refreshToken,refreshTokenOptions)
            res.status(200).json({user:result?.user,message:"user logged In successfully",role:'user'})
        }
       }catch(error:any){
        console.log(" comminng to the eroror")
         return next(new ErrorHandler(error,next))
       }
    }

    async logout(req:Req, res: Res,next : Next){
        try{
            res.clearCookie('accessToken',accessTokenOptions)
            res.clearCookie('refreshToken',refreshTokenOptions)
            res.status(200).json({sucess:true ,message:"logout successful"})
        }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
        }
    }

    async userDetails(req:Req,res:Res,next:Next){
        try{
           const {id} = req.params
  console.log("our id",id)
           const user = await this.userUseCase.getUser(id as string,next)
           console.log("contorller ",user)
           res.json({user:user,message:"got users successfully"})

        }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
        }
    }

    async editProfile(req:Req,res:Res,next:Next){
        const {id} = req.params
        const {formData} = req.body
        console.log(" id",id)
        console.log("body",formData)

        const user = await this.userUseCase.editProfile(id,formData,next)
         console.log("controll user",user)
        if(user){
            res.json({user:user,message:"successfully edited"})
        }
    }

    async addProfilePicture(req:Req,res:Res,next:Next){
        try{
            const {id,image} = req.body
        console.log(" id",id,image)
      

        const user = await this.userUseCase.addProfilePicture(id,image,next)
         console.log("controll user",user)
        if(user){
            res.json({user:user,message:"successfully edited"})
        }
        }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))

        }
    }

    async resendOtp(req:Req,res:Res,next:Next){
         try{
            const {email} = req.body
            await this.userUseCase.resentOtp(email,next)
            res.json({message:"successfulll"})
         }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
         }
    }
}