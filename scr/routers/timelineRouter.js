import { Router } from "express";
import { getPosts, postTimeline, putTimeline, deletePost } from "../repositories/timelineRepositories.js";
import { authorization } from "../middlewares/authentication.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { linkSchema } from "../schemas/authSchema.js";

const timelineRouter = Router();

timelineRouter.post('/post', authorization, postTimeline, teste);
timelineRouter.get('/post', authorization, validateSchema(linkSchema), getPosts);
timelineRouter.get('/post/:userId', authorization, getPosts);
timelineRouter.put('/post/:postId', authorization, putTimeline);
timelineRouter.delete('/post/:postId', authorization, deletePost);

export default timelineRouter;

function teste(req, res, next) {
    console.log(res.local)
}