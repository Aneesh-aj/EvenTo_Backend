import { Next,Req,Res } from "../framework/types/serverPackageTypes";
import { IadminUsecase } from "../usecases/interface/usecase/adminUseCase";
import { accessTokenOptions, refreshTokenOptions } from "./middleware/Tokens";
export class AdminController{

    private adminUsecase : IadminUsecase
     constructor(adminUsecase:IadminUsecase){
        this.adminUsecase = adminUsecase
     }

     async login(req:Req, res:Res,next : Next){
        console.log("at the controller")
            let admin = await this.adminUsecase.login({email:req.body.email,password:req.body.password},next)

            res.cookie("accesToken",admin?.accessToken,accessTokenOptions)
         res.cookie("refreshToken",admin?.refreshToken,refreshTokenOptions)
         res.cookie("role",'user')

         if(admin){
             console.log("amdinn",admin.accessToken)
         }
         res.status(200).json({token:admin?.accessToken,role:'admin'})
  
     }

     async getRequests(req:Req,res:Res,next:Next){
        let requests = await this.adminUsecase.getRequests(next)
        console.log(" all the requests",requests)
        res.status(200).json({result:requests})
     }

     async getDetails(req:Req,res:Res,next:Next){
        const id :string  = req.params.id
        console.log(id)
        let details = await this.adminUsecase.getDetails(id,next)
        console.log(" all the requests",details)
        res.status(200).json({result:details})
     }

     async Approve(req:Req,res:Res,next:Next){
        const id :string  = req.params.id
        console.log(id)
        let details = await this.adminUsecase.approve(id,next)
        console.log(" all the requests",details)
        res.status(200).json({result:details})
     }

     async Reject(req:Req,res:Res,next:Next){
        const id :string  = req.params.id
        console.log(id)
        let details = await this.adminUsecase.reject(id,next)
        console.log(" all the requests",details)
        res.status(200).json({result:details})
     }
     async getAllusers(req:Req,res:Res,next:Next){
        let details = await this.adminUsecase.getAllusers(next)
        console.log(" all the requests",details)
        res.status(200).json({result:details})
     }
     async getAllorganizer(req:Req,res:Res,next:Next){
       
        let details = await this.adminUsecase.getAllorganizers(next)
        console.log(" all the requests",details)
        res.status(200).json({result:details})
     }

     async blockUser(req:Req,res:Res,next:Next){
        const id :string  = req.params.id
        console.log(id)
        let details = await this.adminUsecase.blockUsers(id,next)
        console.log(" all the requests",details)
        res.status(200).json({result:details})
     }
     async blockOrgnaizer(req:Req,res:Res,next:Next){
        const id :string  = req.params.id
        console.log(id)
        let details = await this.adminUsecase.blockOrganizer(id,next)
        console.log(" all the requests",details)
        res.status(200).json({result:details})
     }
}