import { Next,Req,Res } from "../frameWork/types/serverPackageTypes";
import { IorganizerUseCase } from "../usecases/interface/usecase/organizerUseCase";

export class OrganizerController{
     private organizerUsecase : IorganizerUseCase

     constructor(organizerUseCase: IorganizerUseCase){
         this.organizerUsecase = organizerUseCase
         
     }

     async singup(req:Req, res: Res, next : Next){
           console.log(" controllers of signup")
           const result = await this.organizerUsecase.signupOrganzier(req.body.email,next)
           res.json().status(200)
     }

     async createOrganizer(req:Req,res: Res, next : Next){
         console.log("here at organiizer",req.body )
         console.log("ownerId:", typeof req.body.license);


          const result = await  this.organizerUsecase.createOrganizer(req.body,next)
          console.log("here at organiizer  result",result)
         res.json().status(200)
     }

}