import { Router } from "express";

import { search } from "../controllers/usersController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { getUserSchema } from "../schemas/usersSchema.js";




const usersRouter = Router();

usersRouter.post('/search',validateSchema(getUserSchema), search );

export default usersRouter;