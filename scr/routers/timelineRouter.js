import { Router } from "express";
import { getPosts, postTimeline, 
    putTimeline, deletePost, getPostsId, 
    rePostTimeline, deleteRePost, getNewPosts, getNewPostsId 
} from "../repositories/timelineRepositories.js";

import { postInfos, postInfosId } from "../middlewares/postsInfoMiddleware.js"; 
import { authorization } from "../middlewares/authentication.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { linkSchema } from "../schemas/authSchema.js";

const timelineRouter = Router();

timelineRouter.post('/post', authorization, validateSchema(linkSchema), postTimeline);
timelineRouter.get('/post', authorization, postInfos, getPosts);
timelineRouter.get('/post/:userId', authorization, postInfosId, getPostsId);
timelineRouter.put('/post/:postId', authorization, putTimeline);
timelineRouter.delete('/post/:postId', authorization, deletePost);


timelineRouter.post('/repost', authorization, rePostTimeline);
timelineRouter.delete('/repost', authorization, deleteRePost);

timelineRouter.get('/new/post/:userId', authorization, getNewPostsId);
timelineRouter.get('/new/post', authorization, getNewPosts);


export default timelineRouter;
