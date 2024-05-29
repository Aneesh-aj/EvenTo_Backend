import { Next, Req, Res } from "../framework/types/serverPackageTypes";
import { IorganizerUseCase } from "../usecases/interface/usecase/organizerUseCase";
import ErrorHandler from "../usecases/middleares/errorHandler";
import { accessTokenOptions, refreshTokenOptions } from "../framework/webServer/middlewares/Tokens";
import { error } from "console";
import { IeventPost } from "../entities/eventPost";

export class OrganizerController {
  private organizerUsecase: IorganizerUseCase

  constructor(organizerUseCase: IorganizerUseCase) {
    this.organizerUsecase = organizerUseCase

  }

  async singup(req: Req, res: Res, next: Next) {
    try {
      console.log(" controllers of signup")
      const result = await this.organizerUsecase.signupOrganzier(req.body.email, req.body.name, next)
      console.log("after result", result)
      if (result) {
        console.log("inside")
        res.status(200).json({ message: "OTP sented to the Email" })
      }
    } catch (error: any) {
      console.log("cought error", error)
      return next(new ErrorHandler(error, next))
    }
  }

  async createOrganizer(req: Req, res: Res, next: Next) {
    try {
      console.log("here at organiizer", req.body)
      console.log("ownerId:", typeof req.body.license);


      const result = await this.organizerUsecase.createOrganizer(req.body, next)
      console.log("here at organiizer  result", result)
      if (result) {
        res.status(200).json({ message: 'Registration conformed,wait for the approval', success: true, organizer: result, role: 'requestPending' })
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async verifyOtp(req: Req, res: Res, next: Next) {
    try {
      console.log("coming her the contorlller-----------------",req.body)
      const isCorrect = await this.organizerUsecase.verifyOtp(req.body.email, req.body.otp, next)
      console.log("is corresct", isCorrect)
      if (isCorrect?.success) {
        res.status(200).json({ message: "successfully verified the otp", success: true })
      }else{
         res.json({message:" Otp missMatched !!",success:false})
      }

    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }
  async logout(req: Req, res: Res, next: Next) {
    try {
      res.clearCookie('accessToken', accessTokenOptions)
      res.clearCookie('refreshToken', refreshTokenOptions)
      res.status(200).json({ success: true, message: "logout successful" })
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async isApproved(req: Req, res: Res, next: Next) {
    try {
      const { id } = req.params
      const isApproved = await this.organizerUsecase.isApproved(id, next)
       console.log(" the approval-----",isApproved)
      res.json({ approval: isApproved })
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async login(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body
      console.log(email, password, " form the formdata")
      const result = await this.organizerUsecase.login(email, password, next)
      console.log(result)
      if (result) {
        const accessToken = result?.tokens?.accessToken;
        const refreshToken = result?.tokens?.refreshToken;

        if (accessToken && refreshToken) {
          res.cookie("accessToken", accessToken, accessTokenOptions);
          res.cookie("refreshToken", refreshToken, refreshTokenOptions);
          res.cookie("role", "organizer");

        } else {
          console.error("Access token or refresh token is missing");
        }
      }
      res.status(200).json({ organizer: result?.organizer, role: "organizer", message: "logined successfully", accessToken: result?.tokens.accessToken, refreshToken: result?.tokens.refreshToken })

    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async uploadBackground(req: Req, res: Res, next: Next) {
    try {
      const { id, image } = req.body
      console.log(" the body", req.body)
      console.log("id and url", id, image)
      const result = await this.organizerUsecase.uploedImage(id as string, image, next)
      console.log(result)
      res.json({ image: result, message: "successfully uploaded" })
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async uploadProfilePicture(req: Req, res: Res, next: Next) {
    try {
      const { id, image } = req.body
      console.log(" the body-----------", req.body)
      console.log("id and url-----------", id, image)
      const result = await this.organizerUsecase.uploadProfile(id as string, image, next)
      console.log(result)
      res.json({ image: result, message: "successfully uploaded" })
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }


  async findbyId(req: Req, res: Res, next: Next) {
    try {
      const { id } = req.params
      console.log("id", id)
      const organizer = await this.organizerUsecase.allDetailsById(id, next)
      res.json({ organizer: organizer })
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))

    }
  }

  async resendOtp(req: Req, res: Res, next: Next) {
    try {
      const { email } = req.body
      await this.organizerUsecase.resentOtp(email, next)
      res.json({ message: "successfulll", status: 200 })
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async getEvents(req: Req, res: Res, next: Next) {
    const { id } = req.params
    console.log("herereee", id)
    res.json({ name: "aeslsdslfj", other: "hskdfhskfhsfhkshkhf", hii: "sdfkhskdf" })
  }

  async eventCreate(req: Req, res: Res, next: Next) {
    const { data } = req.body
    console.log(" data form the front end", data)
  }

  async getAllCategory(req: Req, res: Res, next: Next) {
    try {

      const result = await this.organizerUsecase.getAllCategory(next)
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

  async editProfile(req: Req, res: Res, next: Next) {
    try {

      const { formData, id } = req.body
      console.log(" id", id)
      console.log("--------------------------------------body---------------------------", formData)

      const user = await this.organizerUsecase.editProfile(id, formData, next)
      res.json({ success: true, message: "profile Edited" })
    } catch (error: any) {
      return next(new ErrorHandler(error.state, error.message))
    }
  }

  async avalibleCategory(req: Req, res: Res, next: Next) {
    try {
      const { id } = req.params
      console.log("the paramsa", id)
      console.log(" heree")
      const category = await this.organizerUsecase.getCategory(id, next)
      console.log(" the categorysss ==================================>", category)
      res.json({ category })
    } catch (error: any) {
      return next(new ErrorHandler(error.state, error.message))
    }
  }

  async createEvent(req: Req, res: Res, next: Next) {
    try {
      const { data } = req.body
      console.log(" data from body---------------------------------------------------------------", data)
      const event = await this.organizerUsecase.createEvent(data, next)
      console.log(" the event commining from the backend is heress-------------", event)
      if (event) {
        console.log(" commigngn here", event)
        res.json({ event })
      } else {
        res.json({ success: false, message: "unable to create" })
      }

    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }


  async updateEvent(req: Req, res: Res, next: Next) {
    try {
      const { data ,eventId} = req.body
      console.log(" data from body---------------------------------------------------------------", data)
      const event = await this.organizerUsecase.eventUpdate(data,eventId, next)
      console.log(" the event commining from the backend is heress-------------", event)
      if (event) {
        console.log(" commigngn here", event)
        res.json({ event })
      } else {
        res.json({ success: false, message: "unable to create" })
      }

    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async getAllevents(req: Req, res: Res, next: Next) {
    try {
      const { id } = req.params
      console.log(" id ")
      const events = await this.organizerUsecase.getAllevents(id, next)
      console.log("eventsss-----------------------------------------", events)
      if (events && events.length > 0) {
        res.json({ events, success: true })
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))

    }
  }

  async getEventDetails(req: Req, res: Res, next: Next) {
    try {
      const { id } = req.params
      const details = await this.organizerUsecase.getEventDetails(id, next)
      if (details) {
        res.json({ details, message: "successfull", success: true })
      } else {
        res.json({ success: false, message: "not matching event Found" })
      }

    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }


  async eventPost(req: Req, res: Res, next: Next) {
    try {
      console.log(" the body", req.body)
      const { data } = req.body
      console.log(" the data that passed------------- ", data)
      const post = await this.organizerUsecase.eventPost(data as unknown as IeventPost, next)
      console.log(" the post return in the controllere ", post)
      if (post) {
        res.json({ post, message: "post created successfully", success: true })
      } else {
        res.json({ message: "unable to create post", success: false })
      }

    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }


  async getAlleventPost(req: Req, res: Res, next: Next) {
    try {
      const posts = await this.organizerUsecase.getAlleventPost(next)
      if (posts) {
        res.json({ posts, success: true })
      } else {
        res.json({ message: "NO Post Avalible" })
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async getUpcomingEvent(req: Req, res: Res, next: Next) {
    try {
      const { id } = req.params
      const events = await this.organizerUsecase.getUpcomingEvent(id, next)
      if (events && events.length > 0) {
        res.json({ events, success: true })
      } else {
        res.json({ success: false, message: "no events Found" })
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async changeStatus(req: Req, res: Res, next: Next) {
    try {
      const { eventStatus, eventId, organizerId } = req.body
      console.log(" the status and the id", eventStatus, eventId, organizerId)
      const events = await this.organizerUsecase.changeStatus(eventStatus, eventId, organizerId, next)
      if (events && events.length > 0) {
        res.json({ events, success: true })
      } else {
        res.json({ success: false, message: "no events Found" })
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }


  async cancelEvent(req: Req, res: Res, next: Next) {
    try {
      const { eventId, organizerId } = req.body
      console.log(" the status and the id", eventId, organizerId)
      const events = await this.organizerUsecase.cancelEvent(eventId, organizerId, next)
      if (events && events.length > 0) {
        res.json({ events, success: true })
      } else {
        res.json({ success: false, message: "no events Found" })
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }


  async getEventPost(req: Req, res: Res, next: Next) {
    try {
      const { organizerId } = req.params
      console.log(" the id ", organizerId)
      const eventPost = await this.organizerUsecase.getEventPost(organizerId, next)
      res.json({eventPost})
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async updatePost(req:Req,res:Res,next:Next){
     try{
      const {formData,id} = req.body
      console.log(" the bofyddd",formData)
      const updatePost = await this.organizerUsecase.updatePost(formData,id,next)
       if(updatePost){
          res.json({success:true,message:"updated succeefully"})
       }else{
        res.json({success:false,message:"Issue while updating!! try again later"})
       }
     }catch(error:any){
      return next(new ErrorHandler(error.status, error.message))

     }
  }

  async getAllbooking(req:Req,res:Res,next:Next){
     try{
       const {id} = req.params
       console.log(" coming and the id is",id)
       const allBookings = await this.organizerUsecase.getAllBookings(id,next)
        console.log(" all bookings-0---------",allBookings)
       return res.json({allBookings})
     }catch(error:any){
      return next(new ErrorHandler(error.status, error.message))

     }
  }

  async getAllRequests(req:Req,res:Res,next:Next){
     try{
       const {id} = req.params
       const requests = await this.organizerUsecase.getAllRequests(id,next)
       return res.json({allRequests:requests})
     }catch(error:any){
       return next(new ErrorHandler(error.status , error.message))
     }
  }

  async getRequestDetails(req:Req,res:Res,next:Next){
    try{
       const {id} = req.params
       const request = await this.organizerUsecase.getRequestDetails(id,next)
       return res.json(request)
    }catch(error:any){
        return next(new ErrorHandler(error.status,error.message))
    }
 }

}  