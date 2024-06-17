import { Next, Req, Res, Route } from "../../types/serverPackageTypes";
import { isAuthenticate } from "../middlewares/auth";
import { commentController } from "./injections/Injection";

export function CommentRoute(router: Route) {

    router.get('/:postId', isAuthenticate, (req: Req, res: Res, next: Next) => {
        commentController.getCommets(req, res, next)
    })

    router.post('/postlike',isAuthenticate, (req: Req, res: Res, next: Next) => {
        commentController.postLike(req, res, next)
    })
    
    router.post('/addComment',isAuthenticate, (req: Req, res: Res, next: Next) => {
        commentController.addComment(req, res, next)
    })

    router.delete("/delete/:id",isAuthenticate, (req: Req, res: Res, next: Next) => {
        commentController.deleteComment(req, res, next)
    })

    router.post("/comment/:id/reply",isAuthenticate, (req: Req, res: Res, next: Next) => {
        commentController.replyToComment(req, res, next)
    })


    return router
}