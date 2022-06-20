import { Router } from "express";

import { search } from "../controllers/usersController.js";




const usersRouter = Router();

usersRouter.get('/search/:user', search );

export default usersRouter;