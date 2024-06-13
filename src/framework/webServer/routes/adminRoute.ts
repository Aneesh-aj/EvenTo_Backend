import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { adminController } from "./injections/Injection";
import { isAuthenticate } from "../middlewares/auth";
import { isAdmin } from "../middlewares/roleAuth";

export function AdminRoute(router: Route) {

    router.post('/login', (req: Req, res: Res, next: Next) => {
        adminController.login(req, res, next)
    })

    router.post('/requestPending',isAdmin,isAuthenticate, (req: Req, res: Res, next: Next) => {
        adminController.getRequests(req, res, next)
    })

    //  router.post('/requestPending',isAdmin,isAuthenticate,(req: Req, res: Res, next: Next)=>{
    //      adminController.getRequestPending(req,res,next)
    //  })

    router.get('/requestDetails/:id',isAdmin,isAuthenticate, (req: Req, res: Res, next: Next) => {
        adminController.getDetails(req, res, next)
    })
    router.post('/approve/:id',isAdmin,isAuthenticate, (req: Req, res: Res, next: Next) => {
        adminController.Approve(req, res, next)
    })
    router.post('/reject/:id',isAuthenticate,isAdmin, (req: Req, res: Res, next: Next) => {
        adminController.Reject(req, res, next)
    })
    router.get('/users',isAdmin,isAuthenticate, (req: Req, res: Res, next: Next) => {
        adminController.getAllusers(req, res, next)
    })
    router.get('/organizers',isAdmin,isAuthenticate, (req: Req, res: Res, next: Next) => {
        adminController.getAllorganizer(req, res, next)
    })

    router.post('/user/block/:id',isAdmin,isAuthenticate, (req: Req, res: Res, next: Next) => {
        console.log("bloclk router")
        adminController.blockUser(req, res, next)
    })
    router.post('/organizer/block/:id', isAdmin,isAuthenticate, (req: Req, res: Res, next: Next) => {
        adminController.blockOrgnaizer(req, res, next)
    })

    router.post("/addCategory", isAdmin,isAuthenticate,  (req: Req, res: Res, next: Next) => {
        adminController.addCategory(req, res, next)
    })

    router.post("/deleteCategory/:id",isAdmin,isAuthenticate,  (req: Req, res: Res, next: Next) => {
        adminController.deleteCategory(req, res, next)
    })

    router.get("/category",isAdmin,isAuthenticate,  (req: Req, res: Res, next: Next) => {
        adminController.getAllCategory(req, res, next)
    })

    router.post("/activeCategory", isAdmin,isAuthenticate,  (req: Req, res: Res, next: Next) => {
        adminController.activeCategory(req, res, next)
    })
    
    router.post("/editCategory", isAdmin,isAuthenticate, (req:Req,res:Res,next:Next)=>{
         adminController.editCategory(req,res,next)
    })

    router.get("/fetchGraphData",isAdmin,isAuthenticate,(req:Req,res:Res,next:Next)=>{
         console.log(" entreing0000000000")
        adminController.fetchGraphData(req,res,next)
    })
   

    router.get("/dashboard",isAdmin,isAuthenticate,(req:Req,res:Res,next:Next)=>{
        console.log(" entreing0000000000")
       adminController.dashboardData(req,res,next)
   })
  



    return router
}