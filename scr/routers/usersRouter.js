import { Router } from "express";

import { search } from "../controllers/usersController.js";
import { verifyJWT } from "../middlewares/tokenMiddleware.js";



const usersRouter = Router();

usersRouter.get('/search/:user', verifyJWT,  search );

export default usersRouter;