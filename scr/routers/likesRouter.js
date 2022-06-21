import { Router } from "express";
import { getLikes } from "../repositories/likesRepository.js";

const likesRouter = Router();

likesRouter.post('/like' );
likesRouter.get('/like', getLikes);
likesRouter.delete('/like/:likeId' );

export default likesRouter;
