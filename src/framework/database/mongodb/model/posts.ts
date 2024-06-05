    import mongoose, { Model, Schema } from "mongoose";
    import { Ipost } from "../../../../entities/posts";


    const postSchema : Schema <Ipost> = new mongoose.Schema({
        organizerId:{type:String},
        description:{type:String},
        postImage:{type:String},
        likes:{type:[Object]}
    })


    const postModel : Model<Ipost> = mongoose.model('post',postSchema)
    export default postModel