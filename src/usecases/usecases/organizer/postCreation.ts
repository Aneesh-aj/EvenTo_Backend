import { Ipost } from "../../../entities/posts"
import { IpostRepository } from "../../interface/repositoryInterface/postRepository"

export const postCreation = async (data:Ipost,postRepository:IpostRepository): Promise<{ success: boolean, message: string } | undefined> => {
    try {
       const posts = await postRepository.createPost(data) 
       return posts
    } catch (error) {
        throw error
    }
}