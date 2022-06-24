import { Router } from "express";
import { getPosts, postTimeline, putTimeline, deletePost, getPostsId, rePostTimeline, deleteRePost } from "../repositories/timelineRepositories.js";
import { postInfos, postInfosId } from "../middlewares/postsInfoMiddleware.js"; 
import { validateSchema } from "../middlewares/validateSchema.js";
import { linkSchema } from "../schemas/authSchema.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { insertHashtags, insertRelation, deleteRelation } from "../controllers/hashtagController.js";

const timelineRouter = Router();

timelineRouter.post('/post', validateToken, validateSchema(linkSchema), postTimeline, insertHashtags, insertRelation);
timelineRouter.get('/post', validateToken, postInfos, getPosts);
timelineRouter.get('/post/:userId', validateToken, postInfosId, getPostsId);
timelineRouter.put('/post/:postId', validateToken, putTimeline, insertHashtags, deleteRelation, insertRelation);
timelineRouter.delete('/post/:postId', validateToken, deletePost);


timelineRouter.post('/repost', validateToken, rePostTimeline);
timelineRouter.delete('/repost', validateToken, deleteRePost);

export default timelineRouter;
