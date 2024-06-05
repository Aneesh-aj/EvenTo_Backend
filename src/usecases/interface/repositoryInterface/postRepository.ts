import { Ipost } from "../../../entities/posts";

export interface IpostRepository{
    createPost(data:Ipost):Promise<{success:boolean,message:string} | undefined>
    updatePost(postId:string,data:Ipost):Promise<{success:boolean,message:string} | undefined >
    deletePost(postId:string):Promise<{success:boolean,message:string} | undefined>
    getPost(organizerId:string):Promise<any>
    getAllposts():Promise<any>
}