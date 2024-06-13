import { Document, ObjectId } from 'mongoose';

export interface Ipost extends Document {
  organizerId: ObjectId;
  description: string;
  postImage: string;
  likes: Object[];
  comments: ObjectId[];
  createdAt: Date;

}
