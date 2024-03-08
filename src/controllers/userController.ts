import { Req, Res, Next } from "../framework/types/serverPackageTypes"
import { IuserUseCase } from "../usecases/interface/usecase/userUseCase"
import ErrorHandler from "../usecases/middleares/errorHandler"
import { accessTokenOptions, refreshTokenOptions } from "./middleware/Tokens"



export class UserController {

    private userUseCase: IuserUseCase

    constructor(userUseCase: IuserUseCase,) {
        this.userUseCase = userUseCase

    }

    async signup(req: Req, res: Res, next: Next) {
        try {
            console.log("the backedn ", req.body.email)
            console.log("whole body", req.body)
            const Token = await this.userUseCase.userSignup({ name: req.body.name, email: req.body.email, password: req.body.password }, next)
            
            res.cookie("verificationToken",Token,{
                httpOnly:true,
                sameSite:"strict",
                expires:new Date(Date.now()+ 30 * 60 * 1000),
            })

            res.status(200).json({
                 success:true,
                 message:"verification otp has been sent to the mail"
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.status, error.message))
        }

    }


    async createUser(req: Req, res: Res, next: Next) {
        console.log("int the createuser controller")
        const user = await this.userUseCase.createUser({ name: req.body.name, email: req.body.email, password: req.body.password }, req.body.otp, next)
        console.log("at the end of the uer", user)
        res.send('/user/profile')
    }

    async organizerLogin(req: Req, res: Res, next: Next) {
        console.log("org login controller")
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