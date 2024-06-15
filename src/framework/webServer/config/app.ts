import express, { NextFunction, Router, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { UserRoute } from '../routes/userRoute'
import { OrganizerRoute } from '../routes/organizerRoute'
import { AdminRoute } from '../routes/adminRoute'
import { errorMiddleware } from '../../../usecases/middleares/errorMiddleware'
import commentModel from '../../database/mongodb/model/comments'
import mongoose from 'mongoose'
import postModel from '../../database/mongodb/model/posts'
import dotenv from "dotenv"
dotenv.config()


export const app = express()

console.log(" call coming ---")
export const allowedOrigins = ["https://evento-rust.vercel.app/", "http://localhost:5173"];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'PATCH', 'PUT', 'POST'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-refresh-token', 'x-user-role'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
console.log(" after the corss")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/comments/:postId', async (req, res) => {
  try {
    console.log("Fetching comments for post ID:", req.params.postId);
    const { postId } = req.params

    const comments = await commentModel.aggregate([
      { $match: { postId: new mongoose.Types.ObjectId(postId) } },
      {
        $lookup: {
          from: 'users', // The collection to join with (users)
          localField: 'userId', // The field from the comments collection
          foreignField: '_id', // The field from the users collection
          as: 'user' // The name of the new array field to add to the documents
        }
      },
      { $unwind: '$user' }, // Deconstruct the array field (if necessary)
      {
        $lookup: {
          from: 'comments',
          localField: 'replies',
          foreignField: '_id',
          as: 'replies'
        }
      },
      { $unwind: { path: '$replies', preserveNullAndEmptyArrays: true } }, // Preserve comments with no replies
      {
        $lookup: {
          from: 'users',
          localField: 'replies.userId',
          foreignField: '_id',
          as: 'replies.user'
        }
      },
      { $unwind: { path: '$replies.user', preserveNullAndEmptyArrays: true } }, // Preserve replies with no user
      {
        $group: {
          _id: '$_id',
          postId: { $first: '$postId' },
          userId: { $first: '$userId' },
          user: { $first: '$user' },
          text: { $first: '$text' },
          createdAt: { $first: '$createdAt' },
          replies: { $push: '$replies' }
        }
      }
    ]);

    console.log("Retrieved comments:", comments);
    res.json(comments);
  } catch (error: any) {
    console.log("Error fetching comments:", error);
    res.status(500).json({ error: error.message });
  }
});


// Add a comment
app.post('/comments/postlike', async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const likedIndex = post.likes.indexOf(userId);
    if (likedIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likedIndex, 1);
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/comments', async (req, res) => {
  try {
    console.log(" enting---------------------------------------------------------------------", req.body)
    const newComment = await commentModel.create(req.body);
    const { postId } = req.body
    const comments = await commentModel.aggregate([
      { $match: { postId: new mongoose.Types.ObjectId(postId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'comments',
          localField: 'replies',
          foreignField: '_id',
          as: 'replies'
        }
      },
      { $unwind: { path: '$replies', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'replies.userId',
          foreignField: '_id',
          as: 'replies.user'
        }
      },
      { $unwind: { path: '$replies.user', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$_id',
          postId: { $first: '$postId' },
          userId: { $first: '$userId' },
          user: { $first: '$user' },
          text: { $first: '$text' },
          createdAt: { $first: '$createdAt' },
          replies: { $push: '$replies' }
        }
      }
    ]);
    res.status(201).json(comments);
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
});

app.delete('/comments/:id', async (req, res) => {
  try {
    await commentModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/comments/:id/reply', async (req, res) => {
  try {
    const reply = new commentModel(req.body);
    await reply.save();
    const parentComment = await commentModel.findById(req.params.id);
    if (parentComment) {
      parentComment.replies.push(reply as any);
      await parentComment.save();
    }
    res.status(201).json(reply);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
app.use("/user", UserRoute(express.Router()))
app.use("/organizer", OrganizerRoute(express.Router()))
app.use("/admin", AdminRoute(express.Router()))

const router = express.Router();

// Get comments for a post

export default router;




app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(` route ${req.originalUrl} isn't found ` as any)
  next(error)
})


app.use(errorMiddleware)