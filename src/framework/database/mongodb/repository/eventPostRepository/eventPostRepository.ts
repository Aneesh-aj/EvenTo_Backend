import { IeventPost } from "../../../../../entities/eventPost";
import { IeventPostRepository } from "../../../../../usecases/interface/repositoryInterface/eventPostRepository";
import { eventPostCreation, getAllPosts } from "./eventPost/index";

export class EventPostRepository implements IeventPostRepository {


    async  eventPostCreation(data: IeventPost): Promise<IeventPost | undefined> {
        return  await eventPostCreation(data)
    }

    async  getAll(): Promise<IeventPost[]> {
        return await getAllPosts()
    }
}