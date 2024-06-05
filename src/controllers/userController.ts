import { Req, Res, Next } from "../framework/types/serverPackageTypes"
import { IuserUseCase } from "../usecases/interface/usecase/userUseCase"
import ErrorHandler from "../usecases/middleares/errorHandler"
import { accessTokenOptions, refreshTokenOptions } from "../framework/webServer/middlewares/Tokens"
import { response } from "express"



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
                    expires:new Date(Date.now()+ 300 * 60 * 1000),
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
            res.cookie('role','user')
            res.status(200).json({user:result?.user,message:"user logged In successfully",role:'user',accessToken:result.tokens.accessToken,refreshToken:result.tokens.refreshToken})
        }
       }catch(error:any){
        console.log(" comminng to the eroror")
         return next(new ErrorHandler(error,next))
       }
    }

    async logout(req:Req, res: Res,next : Next){
        try{
            console.log("logingn out")
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

    async allorganizers(req:Req,res:Res,next:Next){
         try{
             const allOne = await this.userUseCase.allOrganizers(next)

             console.log( "in the=================================================================================== controlleress",allOne)
             if(allOne){
                res.json({allOrganizer:allOne})
             }else{

                 res.json({message:"not found"})
             }
         }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
         }
    }

    async eventPostDetails(req:Req,res:Res,next:Next){
         try{
            const {id} = req.params
            console.log(" the id",id)
           const details = await this.userUseCase.eventPostDetails(id,next)
           if(details){
              res.json({details,success:true})
           }else{
             res.json({success:false,message:"fetching issue !! please try agian later"})
           }
         }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
         }
    }

    async getSeats (req:Req,res:Res,next:Next){
        try{
             const {id} = req.params
             const eventSeat = await this.userUseCase.getSeats(id,next)
            //   console.log("-------------------all seats",eventSeat)
             if(eventSeat){
                console.log(" successs")
                 res.json({eventSeat,success:true})
             }else{
                console.log("thelell")
                 res.json({success:false ,message:"No seats Found"})
             }
        }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
        }
    }


    async bookSeat(req:Req,res:Res,next:Next){
        try{        
            const {id,selectedSeat,userId} = req.body
            console.log("  the body data-----------------------",id )
            const  response = await  this.userUseCase.seatBooking(id,selectedSeat,userId,next)
            if(response){
                console.log("no")
               res.json({success:false})
            }else{
                console.log("yes")
                res.json({success:true})
            }

        }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
        }
    }
    
    async payment(req:Req,res:Res,next:Next){
        try{
            const {eventId,userId,seat,amount,postId} = req.body
             req.app.locals.bookingData = req.body
          const response = await this.userUseCase.payment(eventId,userId,seat,amount, postId,next)
          res.status(200).json(response)
        }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
        }
    }

    async webHookPayment(req:Req,res:Res,next:Next){
        try{
       
            console.log(" webhoookkkkkkk to the controller------",req)
            const payment = await this.userUseCase.paymentStatus(req,next)
            console.log("----------------------- the paymetn statussssss---------------------",payment)
            if(payment){
                const bookingData = req.app.locals.bookingData
                bookingData.paidAmound = Number(bookingData.amount * bookingData.seat.length)
                console.log(" bpplomg detao;ssssss-----------amount",bookingData.paidAmound," and the last full booking data-----------------",bookingData)
                 console.log(" hteejejejejjejej-----------------------------------------------------------------------------",bookingData)
                const chargeId = req.app.locals.chargeId
                console.log("  thsssss charge id------------------",chargeId)
                const booking = await this.userUseCase.booking(bookingData,chargeId ,next)
                 console.log(" ---------------------booked the seatssssss-------------",booking)
            }else{
                console.log(" in the else case")
            }

        }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
        }
    }

    async getAllCategory(req: Req, res: Res, next: Next) {
        try {
    
          const result = await this.userUseCase.getAllCategory(next)
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


      async getAllbookings(req:Req,res:Res,next:Next){
         try{
            const {id} = req.params
             console.log(" bbbbbbbbbbbbbb")
            const response = await this.userUseCase.allBookings(id,next)
            if(response){
                res.json({bookings:response,success:true})
            }else{
                res.json({message:"not found",success:false})
            }
         }catch(error:any){
            return next(new ErrorHandler(error.status, error.message))
         }
      }

      async sentOtp(req:Req,res:Res,next:Next){
         try{
              const {email,user} = req.body
             const sentotp = await this.userUseCase.sentOtp(email,user,next)
             res.json(sentotp)
         }catch(error:any){
            return next(new ErrorHandler(error.status, error.message))
         }
      }

      async changePassword(req:Req,res:Res,next:Next){
        try{
            const {email,password} = req.body
           const sentotp = await this.userUseCase.changePassword(password,email,next)
           res.json(sentotp)
       }catch(error:any){
          return next(new ErrorHandler(error.status, error.message))
       }
      }

      async sendMessage(req:Req,res:Res,next:Next){
         try{           

            const {senterId,receiverId,message,imageUrl} = req.body
            console.log(" the body------------",req.body)
            const sented = await this.userUseCase.sendMessage(senterId,receiverId,message,imageUrl,next)

         }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
         }
      }

      async getChat(req:Req,res:Res,next:Next){
         try{
             const {senterId,receiverId} = req.body
             const chat = await this.userUseCase.findConversation(senterId,receiverId,next)
             return res.json(chat)
         }catch(error:any){
            return next(new ErrorHandler(error.status,error.message))
         }
      }

      async sentRequest(req:Req,res:Res,next:Next){
        try{
            const {data} = req.body
            
            const request = await this.userUseCase.createRequest(data,next)
            return res.json(request)
        }catch(error:any){
             return next(new ErrorHandler(error.status,error.message))
        }
      }

      async posts(req:Req,res:Res,next:Next){
        try{  
            const posts = await this.userUseCase.posts(next)
            return res.json({posts})
        }catch(error:any){
             return next(new ErrorHandler(error.status,error.message))
        }
      }

      
      


 
}