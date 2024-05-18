import { IeventPost } from "../../../../../entities/eventPost";
import { IeventPostRepository } from "../../../../../usecases/interface/repositoryInterface/eventPostRepository";
import { eventPostCreation, getAllPosts, getById, postAndEvent } from "./eventPost/index";

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
}