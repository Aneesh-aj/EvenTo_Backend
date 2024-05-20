import { IeventPost } from "../../../../../entities/eventPost";
import { IeventPostRepository } from "../../../../../usecases/interface/repositoryInterface/eventPostRepository";
import { eventPostCreation, getAllPosts, getById, getPostByOrganizerId, postAndEvent, updatedPost } from "./eventPost/index";

export class EventPostRepository implements IeventPostRepository {


    async  eventPostCreation(data: IeventPost,categoryId:string): Promise<IeventPost | undefined> {
        return  await eventPostCreation(data,categoryId)
    }

    async  getAll(): Promise<IeventPost[]> {
        return await getAllPosts()
    }

    async  getPostByid(id: string): Promise<IeventPost | undefined> {
        return await getById(id)
    }

    async  postAndEvent(id: string): Promise<any> {
        return await postAndEvent(id)
    }

    async  getPostByOrganizerId(organizerId: string): Promise<IeventPost[] | undefined> {
        return await getPostByOrganizerId(organizerId)
    }

    async  updatePost(formData: IeventPost, id: string): Promise<any> {
        return await updatedPost(formData,id)
    }
}