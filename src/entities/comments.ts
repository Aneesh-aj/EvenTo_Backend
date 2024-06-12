import { Document, ObjectId } from 'mongoose';

export interface Icomment extends Document {
  postId: ObjectId;
  userId: ObjectId;
  text: string;
  replies: ObjectId[];
  createdAt: Date;
}
