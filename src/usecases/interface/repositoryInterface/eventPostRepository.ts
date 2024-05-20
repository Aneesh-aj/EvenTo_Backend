import { IeventPost } from "../../../entities/eventPost";


export interface IeventPostRepository{
    eventPostCreation(data:IeventPost,categoryId:string):Promise<IeventPost | undefined>
    getAll():Promise<IeventPost []>,
    getPostByid(id:string):Promise< IeventPost | undefined>
    postAndEvent(id:string):Promise < any>
    getPostByOrganizerId(organizerId:string):Promise<IeventPost [] | undefined>
    updatePost(formData:IeventPost,id:string):Promise<any>

}