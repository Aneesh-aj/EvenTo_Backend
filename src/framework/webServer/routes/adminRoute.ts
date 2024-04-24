import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { adminController } from "./injections/Injection";

export function AdminRoute(router: Route) {

    router.post('/login', (req: Req, res: Res, next: Next) => {
        adminController.login(req, res, next)
    })

    router.get('/Requests', (req: Req, res: Res, next: Next) => {
        adminController.getRequests(req, res, next)
    })
    router.get('/requestDetails/:id', (req: Req, res: Res, next: Next) => {
        adminController.getDetails(req, res, next)
    })
    router.post('/approve/:id', (req: Req, res: Res, next: Next) => {
        adminController.Approve(req, res, next)
    })
    router.post('/reject/:id', (req: Req, res: Res, next: Next) => {
        adminController.Reject(req, res, next)
    })
    router.get('/users', (req: Req, res: Res, next: Next) => {
        adminController.getAllusers(req, res, next)
    })
    router.get('/organizers', (req: Req, res: Res, next: Next) => {
        adminController.getAllorganizer(req, res, next)
    })

    router.post('/user/block/:id', (req: Req, res: Res, next: Next) => {
        console.log("bloclk router")
        adminController.blockUser(req, res, next)
    })
    router.post('/organizer/block/:id', (req: Req, res: Res, next: Next) => {
        adminController.blockOrgnaizer(req, res, next)
    })

    router.post("/addCategory", (req: Req, res: Res, next: Next) => {
        adminController.addCategory(req, res, next)
    })

    router.post("/deleteCategory", (req: Req, res: Res, next: Next) => {
        adminController.deleteCategory(req, res, next)
    })

    router.post("/allcategory", (req: Req, res: Res, next: Next) => {
        adminController.getAllCategory(req, res, next)
    })

    router.post("/activeCategory", (req: Req, res: Res, next: Next) => {
        adminController.activeCategory(req, res, next)
    })



    return router
}