import { Router } from "express";
import { getLikes, postLikes } from "../repositories/likesRepository.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const likesRouter = Router();

likesRouter.post('/like',validateToken, postLikes);
likesRouter.get('/like', validateToken, getLikes);

export default likesRouter;
