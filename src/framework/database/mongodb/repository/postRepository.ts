import mongoose from "mongoose";
import { Ipost } from "../../../../entities/posts";
import { IpostRepository } from "../../../../usecases/interface/repositoryInterface/postRepository";
import postModel from "../model/posts";
import { updatedPost } from "./eventPostRepository/eventPost";


export class PostRepository implements IpostRepository{
    async createPost(data: Ipost): Promise<{ success: boolean; message: string; } | undefined> {
        try{
            const post = await postModel.create(data)
            return post ? {success:true,message:'post created'} : {success:false,message:"Unable to create post"}
        }catch(error){
            throw error
        }
    }

    async updatePost(postId: string, data: Ipost): Promise<{ success: boolean; message: string; } | undefined> {
        try{
              console.log("  the  posdi and the data",postId,data)
            const updatedPost = await postModel.findByIdAndUpdate(postId,{postImage:data.postImage,description:data.description})
            return updatedPost ? {success:true,message:"updated post successfully"} : {success:false,message:"Unable to update post"}
        }catch(error){
           throw error
        }
    }

   async  deletePost(postId: string): Promise<{ success: boolean; message: string; } | undefined> {
        try{
            const deletePost = await postModel.findByIdAndDelete(postId)
            return {success:true,message:"deleted Successfully"}
        }catch(error){
           throw error
        }
    }

    async  getPost(organizerId: string): Promise<any> {
        try{
            const id = new mongoose.Types.ObjectId(organizerId)
            console.log(" the id is ",id)
            const posts = await postModel.find({organizerId:id})
            console.log(" foundedd-------------------------------------",posts)
            return posts
        }catch(error){
             throw error
        }
    }

    async getAllposts(): Promise<any> {
        try {
          const posts = await postModel.find().populate('organizerId');
          console.log("  the post that fetching ",posts)
          return posts;
        } catch (error) {
          throw error;
        }
      }
      
}