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

    async organizerLogin(req: Req, res: Res, next: Next) {
        console.log("org login controller",req.body)
        const user = await this.userUseCase.login(req.body.email, req.body.passsword, next)
        console.log(" at the end")
        console.log(
            "hte user", user
        )
        res.cookie("accesToken", user?.accessToken, accessTokenOptions)
        //  res.cookie("refreshToken",user?.refreshToken,refreshTokenOptions)
        res.cookie("role", 'user')
        if (user) {
            console.log(" usersss", user.accessToken)
        }
        res.status(200).json({ token: user?.accessToken, role: 'user' })
    }
}