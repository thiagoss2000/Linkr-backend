import { Router } from "express";
import { getLikes, postLikes } from "../repositories/likesRepository.js";
import { authorization } from "../middlewares/authentication.js";

const likesRouter = Router();

likesRouter.post('/like',authorization, postLikes);
likesRouter.get('/like', authorization, getLikes);

export default likesRouter;
