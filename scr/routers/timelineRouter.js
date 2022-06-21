import { Router } from "express";
import { getPosts, postTimeline, putTimeline, deletePost } from "../repositories/timelineRepositories.js";
import { authorization } from "../middlewares/authentication.js";

const timelineRouter = Router();

timelineRouter.post('/post', authorization, postTimeline);
timelineRouter.get('/post', authorization, getPosts);
timelineRouter.get('/post/:userId', authorization, getPosts);
timelineRouter.put('/post/:postId', authorization, putTimeline);
timelineRouter.delete('/post/:postId', authorization, deletePost);

export default timelineRouter;