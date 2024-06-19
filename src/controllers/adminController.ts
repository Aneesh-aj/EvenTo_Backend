import { Next, Req, Res } from "../framework/types/serverPackageTypes";
import { IadminUsecase } from "../usecases/interface/usecase/adminUseCase";
import ErrorHandler from "../usecases/middleares/errorHandler";
import { accessTokenOptions, refreshTokenOptions } from "../framework/webServer/middlewares/Tokens";
export class AdminController {

   constructor(private adminUsecase: IadminUsecase) { }

   async login(req: Req, res: Res, next: Next) {
      try {
         console.log("at the controller")
         const admin = await this.adminUsecase.login({ email: req.body.email, password: req.body.password }, next)

         console.log("---------admin------", admin)
         if (admin.message) {
            res.json({ success: false, message: admin.message })
         }
         if (admin) {
            const accessToken = admin?.token?.accessToken;
            const refreshToken = admin?.token?.refreshToken;

            if (accessToken && refreshToken) {
               res.cookie("accessToken", accessToken, accessTokenOptions);
               res.cookie("refreshToken", refreshToken, refreshTokenOptions);
               res.cookie("role", "admin");
               console.log("admin", admin);
               res.status(200).json({ accessToken: admin?.accessToken,refreshToken:admin.refreshToken, admin: admin.admin, role: admin?.admin.role, message: "logined successfully", success: true })
            } else {
               console.error("Access token or refresh token is missing");
            }
         } else {
            res.status(200).json({ token: admin?.accessToken, admin: admin.admin, role: admin?.admin.role, message: "invalid admin", success: false })

         }

      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }

   }




   async getRequests(req: Req, res: Res, next: Next) {
      try {
      
             const requests = await this.adminUsecase.getRequests(next)
         console.log(" all the requests", requests)
         res.status(200).json({ result: requests })
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
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
         if (details) {

            res.status(200).json({ result: details, message: " request approved" })
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
         res.status(200).json({ result: details, message: "request rejected" })
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }
   async getAllusers(req: Req, res: Res, next: Next) {
      try {
         const details = await this.adminUsecase.getAllusers(next)
         console.log(" all the requests", details)
         if (details) {

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
         if (details) {

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
         if (details) {

            res.status(200).json({ message: "blocked user", sucess: true })
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
         if (details) {
            res.status(200).json({ message: "Blocked organizer", success: true })
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
   async addCategory(req: Req, res: Res, next: Next) {
      try {
         const { category } = req.body
         const result = await this.adminUsecase.addCategory(category, next)
         console.log("----____________________________________---------=-_________________--=++")
         if (result) {
            res.json({ category: result, message: "New Category Added", success: true }).status(200)
         } else {

            res.json({ message: "Category already exist",success:false }).status(200)
         }
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }

   async deleteCategory(req: Req, res: Res, next: Next) {
      try {
         const { id } = req.params
         const result = await this.adminUsecase.deleteCategory(id, next)
         if (result) {
            res.json({ category: result, message: "category has been deleted", success: true }).status(200)
         }
         //   res.json({message:"Category already exist"}).status(200)
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }
   async getAllCategory(req: Req, res: Res, next: Next) {
      try {

         const result = await this.adminUsecase.getAllCategory(next)
         console.log(" the result ", result)
         if (result) {
            res.json({ category: result, success: true }).status(200)
         } else {

            res.json({ message: "No category has been found" }).status(200)
         }
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }
   async activeCategory(req: Req, res: Res, next: Next) {
      try {
         const { id } = req.params
         const result = await this.adminUsecase.activeCategory(id, next)
         if (result) {
            res.json({ category: result, message: "category status changed", success: true }).status(200)
         }
         res.json({ message: "INternal error" }).status(200)
      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }

   async editCategory(req: Req, res: Res, next: Next) {
      try {

         const { id, category } = req.body
         console.log(" the id and the category", id, category)
         const result = await this.adminUsecase.editCategory(id, category, next)
         console.log(' the reusult', result)
         if (!result) {
            res.json({ message: "Interanl Issues", success: false })
         } else {
            res.json({ category: result, message: "Successfully Edited", success: true },)
         }

      } catch (error: any) {
         return next(new ErrorHandler(error.status, error.message))
      }
   }

   async fetchGraphData(req:Req,res:Res,next:Next){
      try{  
         console.log(" entereing ")

         const data = await this.adminUsecase.fetchGraphData(next)
         return res.json({data})

      }catch(error:any){
         return next(new ErrorHandler(error.status, error.message))
      }
   }

   async dashboardData(req:Req,res:Res,next:Next){
      try{  
         console.log(" entereing ")

         const data = await this.adminUsecase.dashBoardData(next)
         return res.json({data})

      }catch(error:any){
         return next(new ErrorHandler(error.status, error.message))
      }
   }



}

