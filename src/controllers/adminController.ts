import { Next, Req, Res } from "../framework/types/serverPackageTypes";
import { IadminUsecase } from "../usecases/interface/usecase/adminUseCase";
import ErrorHandler from "../usecases/middleares/errorHandler";
import { accessTokenOptions, refreshTokenOptions } from "./middleware/Tokens";
export class AdminController {

   constructor(private adminUsecase: IadminUsecase){ }

   async login(req: Req, res: Res, next: Next) {
      try {
         console.log("at the controller")
         const admin = await this.adminUsecase.login({ email: req.body.email, password: req.body.password }, next)

         res.cookie("accesToken", admin?.accessToken, accessTokenOptions)
         res.cookie("refreshToken", admin?.refreshToken, refreshTokenOptions)
         res.cookie("role", 'user')

         if (admin) {
            console.log("amdinn", admin.accessToken)
         }
         res.status(200).json({ token: admin?.accessToken, role: 'admin',message:"logined successfully" })
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }

   }

   async getRequests(req: Req, res: Res, next: Next) {
      const requests = await this.adminUsecase.getRequests(next)
      console.log(" all the requests", requests)
      res.status(200).json({ result: requests })
   }

   async getDetails(req: Req, res: Res, next: Next) {
      const id: string = req.params.id
      console.log(id)
      let details = await this.adminUsecase.getDetails(id, next)
      console.log(" all the requests", details)
      res.status(200).json({ result: details })
   }

   async Approve(req: Req, res: Res, next: Next) {
      try {
         const id: string = req.params.id
         console.log(id)
         const details = await this.adminUsecase.approve(id, next)
         console.log(" all the requests", details)
         if(details){

            res.status(200).json({ result: details,message:" request approved" })
         }
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }

   async Reject(req: Req, res: Res, next: Next) {
      try {
         const id: string = req.params.id
         console.log(id)
         let details = await this.adminUsecase.reject(id, next)
         console.log(" all the requests", details)
         res.status(200).json({ result: details , message:"request rejected"})
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }
   async getAllusers(req: Req, res: Res, next: Next) {
      try {
         const details = await this.adminUsecase.getAllusers(next)
         console.log(" all the requests", details)
         if(details){

            res.status(200).json({ result: details })
         }
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }
   async getAllorganizer(req: Req, res: Res, next: Next) {
      try {

         const details = await this.adminUsecase.getAllorganizers(next)
         console.log(" all the requests", details)
         if(details){

            res.status(200).json({ result: details })
         }
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }

   async blockUser(req: Req, res: Res, next: Next) {
      try {
         const id: string = req.params.id
         console.log(id)
         const details = await this.adminUsecase.blockUsers(id, next)
         if(details){

            res.status(200).json({ message:"blocked user",sucess:true})
         }
         console.log(" all the requests", details)
      } catch (error: any) {
         return next(new ErrorHandler(error.state, error.message))
      }
   }
   async blockOrgnaizer(req: Req, res: Res, next: Next) {
      try {
         const id: string = req.params.id
         console.log(id)
         const details = await this.adminUsecase.blockOrganizer(id, next)
         console.log(" all the requests", details)
         if(details){
            res.status(200).json({ message:"Blocked organizer",success:true })
         }
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }
   async logout(req: Req, res: Res, next: Next) {
      try {
         res.clearCookie('accessToken', accessTokenOptions)
         res.clearCookie('refreshToken', refreshTokenOptions)
         res.status(200).json({ suceess: true, message: "logout successful" })
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }
}