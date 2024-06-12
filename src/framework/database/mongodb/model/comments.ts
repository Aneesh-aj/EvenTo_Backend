import mongoose, { Model, Schema } from "mongoose";
import { Icomment } from "../../../../entities/comments";

const commentSchema: Schema<Icomment> = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  text: { type: String, required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
  createdAt: { type: Date, default: Date.now }
});

const commentModel: Model<Icomment> = mongoose.model('comment', commentSchema);
export default commentModel;
