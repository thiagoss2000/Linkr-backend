import { Router } from "express";
import { authorization } from "../middlewares/authentication.js";
import { deleteComments, getComments, postComments } from "../repositories/commentsRepository.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { commentSchema } from "../schemas/authSchema.js";

const commentsRouter = Router();

commentsRouter.post('/comment', authorization, validateSchema(commentSchema), postComments);
commentsRouter.get('/comment', authorization, getComments);
commentsRouter.delete('/comment', authorization, deleteComments);

export default commentsRouter;
