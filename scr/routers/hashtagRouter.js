import { Router } from "express";
import { getHashtags } from "../controllers/hashtagController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const hashtagRouter = Router()

hashtagRouter.get('/hashtag', validateToken ,getHashtags);

export default hashtagRouter;