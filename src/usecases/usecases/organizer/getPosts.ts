import { IpostRepository } from "../../interface/repositoryInterface/postRepository";


export const postFetching = async(organizerId:string,postRepository:IpostRepository):Promise<any>=>{
    try{
           const post = await postRepository.getPost(organizerId)
           return post
    }catch(error){
        throw error
    }
}