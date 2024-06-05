import { IpostRepository } from "../../interface/repositoryInterface/postRepository";

export const getPosts = async(postRepository:IpostRepository):Promise<any>=>{
    try{
        const posts = await postRepository.getAllposts()
        return posts
    }catch(error){
        throw error
    }
}