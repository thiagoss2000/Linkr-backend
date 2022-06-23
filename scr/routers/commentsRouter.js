import { Router } from "express";
import { deleteComments, getComments, postComments } from "../repositories/commentsRepository.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { commentSchema } from "../schemas/authSchema.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const commentsRouter = Router();

commentsRouter.post('/comment', validateToken, postComments);
commentsRouter.get('/comment', validateToken, validateSchema(commentSchema), getComments);
commentsRouter.delete('/comment', validateToken, deleteComments);

export default commentsRouter;
