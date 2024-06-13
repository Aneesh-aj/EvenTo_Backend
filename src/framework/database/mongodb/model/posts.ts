import mongoose, { Model, Schema } from "mongoose";
import { Ipost } from "../../../../entities/posts";

const postSchema: Schema<Ipost> = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'organizer' },
  description: { type: String },
  postImage: { type: String },
  likes: { type: [Object] },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now }

});

const postModel: Model<Ipost> = mongoose.model('Post', postSchema);
export default postModel;
