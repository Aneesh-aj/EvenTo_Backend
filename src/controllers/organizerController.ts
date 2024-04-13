import { Next,Req,Res } from "../framework/types/serverPackageTypes";
import { IorganizerUseCase } from "../usecases/interface/usecase/organizerUseCase";
import ErrorHandler from "../usecases/middleares/errorHandler";
import { accessTokenOptions, refreshTokenOptions } from "./middleware/Tokens";

export class OrganizerController{
     private organizerUsecase : IorganizerUseCase

     constructor(organizerUseCase: IorganizerUseCase){
         this.organizerUsecase = organizerUseCase
         
     }

     async singup(req:Req, res: Res, next : Next){
          try{
            console.log(" controllers of signup")
            const result = await this.organizerUsecase.signupOrganzier(req.body.email,req.body.name,next)
            console.log("after result",result)
            if(result){
              console.log("inside")
                res.status(200).json({message:"OTP sented to the Email"})
            }
          }catch(error:any){
            console.log("cought error",error)
            return next(new ErrorHandler(error,next))
          }
     }

     async createOrganizer(req:Req,res: Res, next : Next){
        try{
          console.log("here at organiizer",req.body )
          console.log("ownerId:", typeof req.body.license);
 
 
           const result = await  this.organizerUsecase.createOrganizer(req.body,next)
           console.log("here at organiizer  result",result)
           if(result){
             res.status(200).json({message:'Registration conformed,wait for the approval',success:true,organizer:result,role:'requestPending'})
           }
        }catch(error:any){
          return next(new ErrorHandler(error.status,error.message))
        }
     }

     async verifyOtp(req:Req, res :Res, next : Next){
         try{
            console.log("coming her the contorlller")
            const isCorrect = await this.organizerUsecase.verifyOtp(req.body.email,req.body.otp,next)
            console.log("is corresct",isCorrect)
            if(isCorrect){
              res.status(200).json({message:"successfully verified the otp",success:true})
            }
          
         }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
         }
     }
     async logout(req:Req, res: Res,next : Next){
      try{
          res.clearCookie('accessToken',accessTokenOptions)
          res.clearCookie('refreshToken',refreshTokenOptions)
          res.status(200).json({success:true ,message:"logout successful"})
      }catch(error:any){
          return next(new ErrorHandler(error.status,error.message))
      }
  }
   
  async isApproved(req:Req,res:Res,next:Next){
      try{
        const {id} = req.params
          const isApproved = await this.organizerUsecase.isApproved(id,next)
          res.json({approval:isApproved})
      }catch(error:any){
         return next(new ErrorHandler(error.status,error.message))
      }
  }

  async login(req:Req,res:Res,next:Next){
    try{
        const {email,password} = req.body
        console.log(email,password," form the formdata")
        const result = await this.organizerUsecase.login(email,password,next)
        console.log(result)
         if(result){
          const accessToken = result?.tokens?.accessToken;
          const refreshToken = result?.tokens?.refreshToken;
        
          if (accessToken && refreshToken) {
            res.cookie("accessToken", accessToken, accessTokenOptions);
            res.cookie("refreshToken", refreshToken, refreshTokenOptions);
            res.cookie("role", "orgnaizer");
          
          } else {
            console.error("Access token or refresh token is missing");
          }
         }
         res.status(200).json({ organizer:result?.organizer, role:"organizer",message:"logined successfully" })

    }catch(error:any){
       return next(new ErrorHandler(error.status,error.message))
    }
  }

  async uploadBackground(req:Req,res:Res,next:Next){
     try{
       const {id,image} = req.body
       console.log(" the body",req.body)
       console.log("id and url",id,image)
       const result = await this.organizerUsecase.uploedImage(id as string,image,next)
          console.log(result)
          res.json({image:result,message:"successfully uploaded"})
     }catch(error:any){
        return next(new ErrorHandler(error.status,error.message))
     }
  }

  async uploadProfilePicture(req:Req,res:Res,next:Next){
    try{
      const {id,image} = req.body
      console.log(" the body",req.body)
      console.log("id and url",id,image)
      const result = await this.organizerUsecase.uploadProfile(id as string,image,next)
         console.log(result)
         res.json({image:result,message:"successfully uploaded"})
    }catch(error:any){
       return next(new ErrorHandler(error.status,error.message))
    }
 }


  async findbyId(req:Req,res:Res,next:Next){
      try{
          const {id} = req.params
          console.log("id",id)
          const organizer = await this.organizerUsecase.findbyId(id,next)
           res.json({organizer:organizer})
      }catch(error:any){
        return next(new ErrorHandler(error.status,error.message))

      }
  }

}