import postModel from "../../../model/posts";

export const postLike=async(postId:string,userId:string)=>{
    try{
        const post = await postModel.findById(postId);

            if (!post) {
              return undefined
            }
        
            const likedIndex = post.likes.indexOf(userId);
            if (likedIndex === -1) {
              post.likes.push(userId);
            } else {
              post.likes.splice(likedIndex, 1);
            }
        
            const updatedPost = await post.save();
            return updatedPost  
    }catch(error){
        throw error
    }
}