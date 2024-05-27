import { Route, Req, Res, Next } from "../../types/serverPackageTypes"
import { isAuthenticate } from "../middlewares/auth"
import { isUser } from "../middlewares/roleAuth"
import { userController } from "./injections/Injection"


export function UserRoute(router: Route) {
    router.post('/register', (req: Req, res: Res, next: Next) => {
        console.log("comming in router")
        userController.signup(req, res, next)
    })

    router.post('/createUser', (req: Req, res: Res, next: Next) => {
        console.log("coming to the router", req.body)
        // return 
        userController.createUser(req, res, next)
    })

    router.post('/login', (req: Req, res: Res, next: Next) => {
        console.log("entering to the  router")
        userController.userLogin(req, res, next)
    })

    router.post('/logout', (req: Req, res: Res, next: Next) => {
        userController.logout(req, res, next)
    })

    router.get('/profile/:id', isUser, isAuthenticate, (req: Req, res: Res, next: Next) => {
        console.log("entering to ----------------------", req.cookies)
        userController.userDetails(req, res, next)
    })

    router.post("/profileEdit/:id", isUser, isAuthenticate, (req: Req, res: Res, next: Next) => {
        console.log("entering to the  router",)

        userController.editProfile(req, res, next)
    })

    router.post("/profileUpload", isUser, isAuthenticate, (req: Req, res: Res, next: Next) => {
        console.log("entering to the  router",)

        userController.addProfilePicture(req, res, next)
    })

    router.post("/resendOtp", (req: Req, res: Res, next: Next) => {
        userController.resendOtp(req, res, next)
    })

    router.get("/allorganizers", isUser, isAuthenticate, (req: Req, res: Res, next: Next) => {
        userController.allorganizers(req, res, next)
    })

    router.get("/eventPostDetails/:id", (req: Req, res: Res, next: Next) => {
        userController.eventPostDetails(req, res, next)
    })


    router.get("/seatBooking/:id", isUser, isAuthenticate, (req: Req, res: Res, next: Next) => {
        userController.getSeats(req, res, next)
    })

    router.post("/Booking", isUser, (req: Req, res: Res, next: Next) => {
        userController.bookSeat(req, res, next)
    })

    router.post("/payment", isUser, isAuthenticate, (req: Req, res: Res, next: Next) => {
        userController.payment(req, res, next)
    })

    router.post("/webHookPayment", (req: Req, res: Res, next: Next) => {
        userController.webHookPayment(req, res, next)
    })

    router.get("/allcategory", isAuthenticate, (req: Req, res: Res, next: Next) => {
        userController.getAllCategory(req, res, next)
    })


    router.get('/allbooking/:id', isUser, isAuthenticate, (req: Req, res: Res, next: Next) => {
        userController.getAllbookings(req, res, next)
    })

    router.post("/sentotp",(req: Req, res: Res, next: Next) => {
        userController.sentOtp(req, res, next)
    })

    router.post("/changepassword",(req: Req, res: Res, next: Next) => {
        userController.changePassword(req, res, next)
    })

    router.post("/sendMessage",isUser,isAuthenticate,(req:Req,res:Res,next:Next)=>{
         userController.sendMessage(req,res,next)
    })

    router.post("/getChat",isUser,isAuthenticate,(req: Req, res: Res, next: Next)=>{
         userController.getChat(req,res,next)
    })




    return router

}