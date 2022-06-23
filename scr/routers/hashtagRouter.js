import { Router } from "express";
import { insertHashtags } from "../controllers/hashtagController.js";

const hashtagRouter = Router()

hashtagRouter.post('/hashtag', insertHashtags);

export default hashtagRouter;